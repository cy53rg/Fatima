

class Dashboard {

    index(req, res){
        const user = req.user
        return res.render('./pages/admin/dashboard', {user,
            layout: './layouts/Adminlayout',
        })
    }

    logout(req,res){

        req.logout(err=>{
            if(err){
                console.log(err);
                return next(err);
            }
            res.redirect('/login');
        });
       
        
    }
}



module.exports = Dashboard