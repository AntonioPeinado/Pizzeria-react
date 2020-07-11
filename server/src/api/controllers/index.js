module.exports = {
    public: [
        require('./register'),
        require('./login'),
        require('./refresh')
    ],
    private: [
        require('./logout'),
        require('./pizzas'),
        require('./comments'),
        require('./base')
    ]
}