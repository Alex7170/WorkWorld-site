module.exports = (res, err) =>{
    res.status(500).json({
        succes: false,
        message: err.message ? err.message : err
    })
}