const router = require('express').Router();
const { Dish, Combo } = require('../../models');
const withAuth = require('../../utils/auth')
//const sequelize = require('../config/connection');
//const Dish = require('../../models/Dish');

const dishData = require('../../seeds/dishes-seeds');


//HOME ROUTES SHOULD BE THE ONLY ONE RENDERING
//res.render - RESERVED FOR HOME ROUTES ONLY
//API ROUTES ARE ONLY INTERFACING THROUGH DATA

// //find all dishes
// router.get('/', (req, res) => {
//     Dish.findAll({})
//         .then(dishData => res.json(dishData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// });

//find one dish item by id
// router.get('/:id', (req, res) => {
//   Dish.findAll({
//           where: {
//               id: req.params.id
//           }
//       })
//       .then(dishData => res.json(dishData))
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       })
// });


//POst dish with Auth
//need to find the correct field input for prepared by and eventid for it to work 
//correctly with the designated user signing up their dish
//router.post('/', withAuth, (req,res) => {
router.post('/', async (req, res) => {
  console.log(req.session)
  console.log(req.body)

  //if (req.session) {
    Dish.create({
      dishname: req.body.dishname,
      //static
      //change preparedby userID
      preparedby: req.session.userID,
      //static
      //change eventid ID to corresponding field/id number this is from a logged in user
      eventid: req.body.eventID,
      dishtype: req.body.dishtype,
      dishallergy: req.body.dishallergy
    })
    .then((dishData) =>{
      console.log('line 59 dish-routes', dishData);

      //update combo on this dish

      const comboUpdate=  Combo.update({
        dishID: dishData.dataValues.id,},
        {
        where: {
          userID: req.session.userID,
          eventID: dishData.dataValues.eventid
        },
      });
      
      res.status(200).json(dishData);
    })
    .catch(err => {
    
      console.log(err);
      res.status(400).json(err);
    });
});


//PUT - on events 
// router.put('/:id', withAuth, (req, res) => {
//   Dish.update({
//     dishname: req.body.dishname 
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(dishData => {
//     if(!dishData){
//       res.status(404).json({message: 'No dish found with id provided'});
//       return;
//     }
//     res.json(dishData);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });


// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
//   const dishe= dishe.findByPk(req.params.id);
//   Dish.update(dishe)
//   .then(dishData => {
//     console.log(dishData, "dish data works?")
//     if (!dishData){
//       res.status(404).json({ message: 'No Category found, Error in ID'});
//       return;
//     }
//     res.json(dishData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
//   });




//delete withAuth and id
router.delete('/:id', withAuth, (req, res) => {
  Dish.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dishData => {
    if (!dishData) {
      res.status(404).json({message: 'No dish found with id'});
      return;
    }
    res.json(dishData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});






















  
//route to get all dishes
// router.get('/', async (req, res) => {
//   console.log(Dish, "err here");
//     //const dishData = await Dish.findAll().catch((err) => { 
//     const dishesData = await Dish.findAll().catch((err) => { 
//       console.log(dishesData, "looking for dD");
//         res.json(err);
//       });
//         const dishe = dishesData.map((dishe) => dishe.get({ plain: true }));
//         console.log("looking for dishe", dishe);
//         res.render('dish', { dishe });
//       });


  
// route to get one dish
// router.get('/dish/:id', async (req, res) => {
//     try{ 
//         const disheData = await Dish.findByPk(req.params.id);
//         if(!disheData) {
//             res.status(404).json({message: 'No dish with this id!'});
//             return;
//         }
//         const dish = dishData.get({ plain: true });
//         res.render('dish', dish);
//       } catch (err) {
//           res.status(500).json(err);
//       };     
//   });
  
//--------------------------------------------------------------------------------//
// get one dish without serializing data
// router.get('/dish/:id', async (req, res) => {
//     try {
//       const dishData = await Dish.findByPk(req.params.id);
//       console.log(dishData)
//       res.render('dish', dishData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  // // get one dish with serialized data
  // router.get('/dish/:id', async (req, res) => {
  //   try {
  //   // Search the database for a dish with an id that matches params
  //   const dishData = await Dish.findByPk(req.params.id);
  //   console.log(dishData)
  //   // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
  //   const dish = dishData.get({ plain: true });
  //   // Then, the 'dish' template is rendered and dish is passed into the template.
  //   res.render('dish', dish);
  //   } catch (err) {
  //       res.status(500).json(err);
  //   }
  // });
 
  //------------------------------------------------------------------------------------//

  // route to create/add a dish using async/await
// router.post('/', async (req, res) => {
//     try { 
//       const dishesData = await Dish.create({
//       dishname: req.body.dishname,
//       preparedby: req.body.preparedby,
//       eventid: req.body.eventid,
//       //nuts: req.body.nuts,
//     });
//     // if the dish is successfully created, the new response will be returned as json
//     res.status(200).json(dishesData)
//   } catch (err) {
//     res.status(400).json(err);
//   }
//   });


module.exports = router;

