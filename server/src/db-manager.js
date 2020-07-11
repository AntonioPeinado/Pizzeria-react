const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync')
const uuid = require('uuid');

class DBManager {
    static async create(json){
        const adapter = new FileAsync(json);
        const db = await low(adapter);
        return new this(db);
    }
    constructor(db) {
        this._db = db;
        this._config = this._readConfig();
    }
    async get(uri, options = {}){
        const {include = [], find} = options;
        const [collection, id] = this._split(uri);
        const query = this._query(collection, id, find);
        const resource = query
            .cloneDeep()
            .value();
        this._include(resource, collection, include);
        return resource;
    }
    async create(uri, data){
        const [collection] = this._split(uri);
        const id = uuid.v4();
        await this._query(collection)
            .push({ id, ...data})
            .write();
        return this._query(collection, id)
            .cloneDeep()
            .value();
    }
    async remove(uri){
        const [collection, id] = this._split(uri);
        await this._query(collection)
            .remove({id})
            .write();
    }
    async update(uri, data){
        const [collection, id] = this._split(uri);
        const resource = await this._query(collection, id)
            .assign(data)
            .cloneDeep()
            .write();
        return resource;
    }
    _readConfig(){
        return this._db
            .get('$')
            .cloneDeep()
            .value();
    }
    _split(uri){
        return uri
            .split('/')
            .filter(Boolean);
    }
    _query(collection, id, find){
        let query = this._db.get(collection);
        if(id) {
            query = query.find({id});
        }
        if(find){
            query = query.find(find);
        }
        return query;
    }
    _include(resource, collection, fields){
        const fieldTree = {};
        for(let includes of fields.map((field)=>field.split('.'))){
            let current = fieldTree;
            for(let include of includes){
                current[include] = current[include] || {};
                current = current[include]
            }
        }
        this._includeTree(resource, collection, fieldTree);
    }
    _includeTree(resource, collection, tree){
        for(let [field, subtree] of Object.entries(tree)){
            if(Array.isArray(resource)){
                resource.forEach((res)=> {
                    this._includeFieldAndSubtree(res, collection, field, subtree);
                })
            } else {
                this._includeFieldAndSubtree(resource, collection, field, subtree);
            }
        }
    }
    _includeFieldAndSubtree(resource, collection, field, subtree) {
        const fromCollection = this._includeField(resource, collection, field);
        this._includeTree(resource[field], fromCollection, subtree);
    }

    _includeField(resource, collection, field){     
        const ownRelation = this._findOwnRelation(collection, field);
        if(ownRelation){
            this._includeFromSelf(resource, ownRelation);
            return ownRelation.fromCollection;
        }
        const relatedEntityRelation = this._findRelatedEntityRelation(collection, field);
        if(relatedEntityRelation) {
            const {entity, relation} = relatedEntityRelation;
            this._includeFromRelatedEntity(resource, entity, relation);
            return entity;
        }
    }
    _findOwnRelation(collection, field){
        const ownRelations = (
            this._config[collection] &&
            this._config[collection].relations ||
            []
        );        
       for(let relation of ownRelations){
           const {hasOne, hasMany} = relation;
           if(hasOne === field || hasMany === field){
               return relation;
           }
       }
    }
    _findRelatedEntityRelation(collection, field){
        for(let [entity, config] of Object.entries(this._config)){
            const relation = config.relations && config.relations.find((relation)=>{
                const {withMany, withOne, fromCollection} = relation;
                return (
                    fromCollection === collection &&
                    withMany === field || 
                    withOne === field
                );
            });
            if(relation){
                return {entity, relation}
            }
        }
    }
    _includeFromSelf(resource, relation) {
        const { fromCollection, hasOne, hasMany} = relation;
        if (hasMany) {
            resource[hasMany] = this._db
                .get(fromCollection)
                .filter((entry) => resource[hasMany].includes(entry.id))
                .cloneDeep()
                .value();
        }
        else if (hasOne) {
            resource[hasOne] = this._db
                .get(fromCollection)
                .find({ id: resource[hasOne] })
                .cloneDeep()
                .value();
        }
    }
    _includeFromRelatedEntity(resource, entity, relation) {
        const { withOne, withMany, hasOne, hasMany } = relation;
        if (withMany && hasOne) {
            resource[withMany] = this._db
                .get(entity)
                .filter({[hasOne]: resource.id})
                .cloneDeep()
                .value();
            return;
        }
        if(withMany && hasMany){
            resource[withMany] = this._db
                .get(entity)
                .filter((entry) => entry[hasMany].includes(resource.id))
                .cloneDeep()
                .value();
            return;
        }
        if (withOne && hasOne) {
            resource[withOne] = this._db
                .get(entity)
                .find({ [hasOne]: resource.id })
                .cloneDeep()
                .value();
            return;
        }
        if (withOne && hasMany) {
            resource[withOne] = this._db
                .get(entity)
                .find((entry) => entry[hasMany].includes(resource.id))
                .cloneDeep()
                .value();
            return;
        }
    }
}

module.exports = {DBManager};