import express from 'express';
import bodyparser from 'body-parser';
import cors from "cors";

import { Op } from "sequelize";
import sequelize from "./db-connection.js"
import Todo from  "./models/todo.model.js";


// let todos = [
//     {
//         id: 1,
//         text: 'Learn React',
//         completed: true
//     },

//     {
//         id: 2,
//         text: 'Learn Redux',
//         completed: false
//     },


//     {
//         id: 3,
//         text: 'Learn GraphQL',
//         completed: false
//     },
//     {
//         id: 4,
//         text: 'Learn Node',
//         completed: false
//     },
    
//     {
//         id: 5,
//         text: 'Express',
//         completed: false
//     },
    
//     {
//         id: 6,
//         text: 'Learn MongoDB',
//         completed: false
//     },
    
//     {
//         id: 7,
//         text: 'Learn Mongoose',
//         completed: false
//     },
    
//     {
//         id: 8,
//         text: 'Learn Rest',
//         completed: false
//     },
    
//     {
//         id: 9,
//         text: 'Learn GraphQL',
//         completed: false
//     },
    
//     {
//         id: 10,
//         text: 'Learn Node',
//         completed: false
//     },
    
//     {
//         id: 11,
//         text: 'Learn Express',
//         completed: false
//     },
    
//     {
//         id: 12,
//         text: 'Learn MongosDB',
//         completed: false
//     },
//     {
//         id: 13,
//         text: 'Learn Mongoose',
//         completed: false
//     },
    
//     {
//         id: 14,
//         text: 'Learn Rest',
//         completed: false
//     },
//     {
//         id: 15,
//         text: 'Learn GraphQL',
//         completed: false
//     },
    

// ];


const app = express();
app.use(cors()) 
 

function logger(req,res,next) {
    console.log(` ${req.method} ${req.path}`);
    next();
}

// function isAuthenticated(req,res,next){
//     console.log('Authenticated');
//     next();
// }



app.use(logger);
// app.use(isAuthenticated);
app.use(bodyparser.json());

function responseBuilder(success, error, data) {
    return{
        success, error, data
    }
}
    

    
    app.get("/", (req, res, next) => {
     res.json({ message:"Hello world"});
    });



//     app.get("/api/todos", (req,res) => {
        
// const search = req.query.search
// const page = parseInt(req.query.page) || 1
// // if(search){
// //     let filteredTodos = todos.filter(todo => todo.text.
// //         toLowerCase().includes(search.toLowerCase()));
// //         return res.status(200).json(responseBuilder(true, null,  {todos: filteredTodos}));
// // }
// const limit = 5
//     return res.status(200).json(responseBuilder(true, null, { todos: todos.slice((page*limit)-limit, page * limit) }));
// });

app.get("/api/todos", (req,res) => {
    // console.log(req)
    if(req.query.search ){
      return Todo.findAll({
          where: {
              [Op.or]: {
           title: {
               [Op.substring]: req.query.search,
           },
           description: {
               [Op.substring]: req.query.search,
           }
         },
        },
      })

    .then((todos) => {
      return res.status(200).json(responseBuilder(true, null, { todos }));
    })
    .catch((e) => {
        console.log(e);
        return res.status(500).json(responseBuilder(false, 'somthing went wrong', null));
    
   });
}
Todo.findAll()
.then((todos) => {
    return res.status(200).json(responseBuilder(true, null, { todos }));
  })
  .catch((e) => {
    console.log(e);
    return res.status(500).json(responseBuilder(false, 'somthing went wrong', null));

});
});


app.post("/api/todos", (req,res) =>{

    const title = req.body.title;
    const description = req.body.description;
    if(!title) {
        return res.status(400).json(responseBuilder(false, "Text is required", null ));
    }
    
    const newtodo = {
        title, 
        description,
    };

    Todo.create(newtodo).then(todo =>
    res.status(201).json(responseBuilder(true, null, { todo})))

    .catch((e) =>
     res.status(500).json(responseBuilder(false,'somthing went wrong', null)));

   
});





app.get("/api/todos/:id", (req, res) => {
    const id = req.params.id;

    Todo.findByPk(id)
    .then(todo => { 
        if(todo) {
            return  res.status(200 ).json(responseBuilder(true, null, { todo}));
        }
        return  res.status(400).json(responseBuilder(true, "Requested todo with the id is not found", { todo: null}));
    })
    .catch((e) =>
     res.status(500).json(responseBuilder(false,'somthing went wrong', null)));
});
    
    // const todo = todos.find((todo) => todo.id === parseInt(id));

    // if(!todo) {
    //     return res.status(400).json(responseBuilder(false, `Todo not found - $(id)`, null));
    // }
    
    // return res.status(200).json(responseBuilder(true, null, { todo }));
    // });




    app.delete("/api/todos/:id", (req, res) => {
        const id = req.params.id;

     Todo.destroy({
         where: {
             id: id,
         },
     })
     .then((deletedTodo) => {
     console.log(deletedTodo);
     if(deletedTodo){
         return res.status(200 ).json(responseBuilder(true, null, {  }));
        }
       return res.status(400).json(responseBuilder(false, 'Todo with the id is not found', {  }));
    })
     .catch((e) =>
     res.status(500).json(responseBuilder(false,'somthing went wrong', null)));
});
        

     

        // const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

        // console.log(id, todoIndex);

        // if (todoIndex == -1) {
        //     return res.status(400).json(responseBuilder(false, `Todo not found - $(id)`, null));
        // }

        // let deletedTodo = todos.splice(todoIndex, 1);

        // return res.status(200).json(responseBuilder(true, null, { todo: deletedTodo }));
    // });





    app.patch("/api/todos/:id", (req, res) => {
        const id = req.params.id;

        const data = req.body;

        Todo.update(data, { 
            where: {
                id: id,
            },
        })
        .then((todo) => {

                console.log(todo)
                if(todo[0]) {
            return res.status(200 ).json(responseBuilder(true, null, {  }));
        }
        return res.status(400 ).json(responseBuilder(false, "id not found", {  }));
    })
        .catch((e) =>
        res.status(500).json(responseBuilder(false,'somthing went wrong', null)));
   });

    //     let todo =todos.find((todo) => todo.id === parseInt(id));

    //     const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

    //     if(!todo) {  return res.status(400).json(responseBuilder(false, `Todo not found - $(id)`, null));

    //     };

    //     todo = {...todo, ...data};

    //     todos.splice(todoIndex, 1, todo);
    // // console.log(todo, todos);

    //     return res.status(200).json(responseBuilder(true, null, { todo }));

    // });
        
    
    // app.listen(4000, () => console.log('Server started on port 4000'));


    // app.get("/", (req, res) => res.json({message: "hello world"}));


    const startServer = () => {
        sequelize.sync();
        sequelize.authenticate()
        .then(() => {
            console.log("Database connected!")
            
            
    app.listen(4000, () => console.log("port 4000 is listening"));
        })
        .catch((e) => console.log(e));
    };
    
    startServer();
    