const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://lokesh210384:mongodblkp@cluster0.dlzboro.mongodb.net/gofoodmern?retryWrites=true&w=majority' // Customer change url to your db you created in atlas
//const mongoURT= 'mongodb://lokesh210384:mongodblkp@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB =async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
        if(err) console.log("---",err)
        else{
    console.log("connected")
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function(err,data){
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function(err,catData){
            if(err)console.log(err);
            else{
                global.food_items = data;
                global.foodCategory = catData;
            }
        })

        // if(err)console.log(err);
        // else{
        //     global.food_items = data;
        //     // console.log(global.food_items)
        // }
    })

}
    });
}
module.exports= mongoDB;