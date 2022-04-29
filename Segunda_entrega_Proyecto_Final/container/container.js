const fs= require('fs');


class Container{
    constructor(filename){
        this.path=filename;
        this.data=this.readFile();
    }

    async readFile(){
        try{
            const data=await fs.readFileSync(this.path);
            if(data.length===0){
                return [];
            }
            else{
            return JSON.parse(data);
            }
        }catch(err){
            console.log(err);
            return [];
        }
    }

   async writeAllFile(array){
        try{
            await fs.writeFileSync(this.path,JSON.stringify(array));
        }catch(err){
            console.log(err);
        }
    }

   async writeFile(obj){
        try{
            const data=await this.data
            data.push(obj);
            await fs.writeFileSync(this.path,JSON.stringify(data));
            console.log(err);
        }
        catch(err){
            console.log(err);
        }
    }

    async removeFile(){
        try{
            const newData=[];
            await fs.writeFileSync(this.path,JSON.stringify(newData));
            this.data=newData;

        }catch(err){
            console.log(err);

        }

    }
}

module.exports=Container;