const dummies = require('../../dummies')


exports.getUser = (req, res) => {

    // TO TEST
    var id = req.params.userId
    if (id>2){
      res.send("Error : to large id for test")
    }else{
      res.send(dummies[id])
    }
  
  
    // FINAL VERSION
      // let user = User.findById(req.params.id, (err: any, user: any) => {
      //   if (err) {
      //     res.send(err);
      //   } else {
      //     res.send(user);
      //   }
      // });
};
