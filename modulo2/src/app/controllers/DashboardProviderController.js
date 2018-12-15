class DashboardProviderController{
    
    index(req, res){
       return res.render('dashboardProvider');
    }
    
}

module.exports = new DashboardProviderController();