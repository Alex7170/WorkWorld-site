module.exports = (res, err) =>{
    res.status(500).json({
        succes: false,
        message: error.message ? error.message : error
    })
}