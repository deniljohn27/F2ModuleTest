
let dispaly=document.getElementById("display");
let orderList=[];
try{
    getMenu();
}
catch(error){
 console.log("Error Occured ",error);
}


function displayItems(data){
    let dbar=document.getElementById("items");
    dbar.innerHTML="";
    for(let i=0;i<orderList.length;i++){
       let imgs=document.createElement("img");
       imgs.src=`${orderList[i].imgSrcs}`
        dbar.append(imgs);
    }

}
async function  getMenu(){
    let data=await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
    let rData=await data.json();
    console.log(rData)
    for(let i=0;i<rData.length;i++){
        let container=document.createElement("div");
        container.className="container";
        
        container.innerHTML=`
        <div class="left">
            <img src=${rData[i].imgSrc}>
        </div>
        <div class="mid">
            <p>${rData[i].name}</p>
        
        </div>
        <div class="right">
            <P>Price : $${rData[i].price}</P>
        </div>
        `;
        container.addEventListener("click",()=>{
            if(container.style.background!="grey"){
                container.style.background="grey";
                orderList.push({Id:rData[i].id,imgSrcs:rData[i].imgSrc});
                // console.log(orderList);
            }else{
                container.style.background="white";
                for(let j=0;j<orderList.length;j++){
                    if(rData[i].id==orderList[j].Id){
                        orderList.splice(j,1);
                    }
                    // console.log(orderList);
                };
            }
            displayItems(orderList);
            
        });
        dispaly.append(container);
    }
    
}

function TakeOrder(){
        //order taken
        try{}
        catch(error){console.log("Error Cooured ",error)}
       let pro= new Promise((resolve)=>{
        setTimeout(()=>{resolve(orderList)},2500)
       });

       pro.then((list)=>{
        // console.log("OrderReceived"); 
        orderPrep().then(()=>{
            colorCHange("orderPrep");

            // console.log("OrderPrepared");
            payOrder().then(()=>{
                // console.log("Paid");
                colorCHange("paid");

                setTimeout(thankyouFnc,1000);
            })
        })
       });

}
// orderPrep();
function orderPrep(){
    let pro= new Promise((resolve)=>{
        setTimeout(()=>{resolve({order_status:true,paid:false})},1500)
       });  
       return pro;     
}
function payOrder(){
    let pro= new Promise((resolve)=>{
        setTimeout(()=>{resolve({order_status:true,paid:true})},1000)
       });   
       return pro;    
}
function thankyouFnc(){
    colorCHange("thankyou");
    setTimeout(()=>{alert("Thankyou for eating with us today!")},1000);
    orderList=[];
    displayItems(orderList);
    setTimeout(()=>{ window.top.location.reload(true)},1000);
   
}
function colorCHange(ele){
    document.getElementById(ele).style.background="green";
    document.getElementById(ele).style.color="white";
    document.getElementById(ele).style.borderColor="green";
}