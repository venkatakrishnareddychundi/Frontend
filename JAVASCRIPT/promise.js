const myPromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
    reject("promise fullfilled after 2 seconds");
},2000)
});
myPromise
    .then((message)=>{console.log(message+" success");})
    .catch((error)=>{console.log(error+" failure");});