//const fetch = require('node-fetch');

let text = ""
let url =''
let start= 0;

async function clickEvent()   // Called on click of search button
{
    text = await document.getElementById("text").value;  // read text input

    if(url=='')
    url = 'https://api.github.com/search/repositories?q='+text;     
    else
    { 
      // If info is on screen already then replace the current content with the new one
      let list= document.getElementsByClassName('list');
      for (let index = 0; index < list.length; index ++) {
      list[index].style.display = 'none';
      }
      url = 'https://api.github.com/search/repositories?q='+text;
    }
  
    if(text != ''){             // If there is no input it will alert to enter input
    await getGithubData();
    document.getElementById('prev').style.visibility = "visible";
    document.getElementById('next').style.visibility = "visible";
    }
    else
        alert("Please enter text")
}

let clickPrev= () =>        // call on click of prev button
{
    start-=10;

    let list= document.getElementsByClassName('list');
    for (let index = 0; index < list.length; index ++) {
    list[index].style.display = 'none';
    }
    
    getGithubData();
}

let clickNext= ()=>     // call on click of next button
{
    start+=10;
    let list= document.getElementsByClassName('list');
    for (let i = 0; i < list.length; i ++) {
    list[i].style.display = 'none';
    }
    getGithubData();
}


async function getGithubData()
{
  let rawData = await fetch(url);       // fetching data on basis of given input
  let  jsonData= await rawData.json();  // Converting recvd data into JSON format
  console.log(jsonData);
  
  for(i=start; i < (start + 10) ; i++)  // It will display only 10 enteries at a time
  {
      async function ownerInfo()
      {
      let item = jsonData.items[i]
      let rawData = await fetch(item.owner.url);  // getting Owner's credentials  
      let  ownerData= await rawData.json();       // Converting recvd data into JSON format 
      let licenseName = null;


      if(item.license != null)
          licenseName = item.license.name;

      //  Creating output in the form of list
      pos ="Showing :" + (start+1) +" to "+ i;
      document.getElementById("pos").innerHTML=pos;

      str = "<br> Name: "+item.name+ "<br>" +
                   "Full Name: "+item.full_name+ "<br>"+
                   "Private: "+item.private+ "<br>"+
                   "License Name: "+licenseName + "<br>"+
                   "Score: "+item.score +"<br><br>"+
                   "Owner login: "+ownerData.login +"<br>"+
                   "Owner name: "+ownerData.name +"<br>"+
                   "Owner followerCount: "+ ownerData.followers+"<br>"+
                   "Owner followingCount: "+ownerData.following+"<br>"

      let li = document.createElement("li")
      li.setAttribute("class","list")
      li.innerHTML=str
      document.getElementById("myList").appendChild(li);
    }
    ownerInfo();

  }
}
