const promise1=new Promise((resolve,reject)=>{

    setTimeout(()=>{
        resolve("This is 1st Promise")
    },1000)
})


const promise2=new Promise((resolve,reject)=>{

    setTimeout(()=>{
        resolve("This is 2nd Promise")
    },2000)
})

const promise3=new Promise((resolve,reject)=>{

    setTimeout(()=>{
        resolve("This is 3rd Promise")
    },3000)
})


Promise.race([promise1,promise2,promise3])
.then((result)=>console.log(result))
.catch((error)=>console.log(error))