var storageMng = (function(){
   var manager = {
       dbKey: "applyd"
   };
   manager.get = function(key) {
      return localStorage.getItem(key);
   }
   manager.put = function(key, value){
      return localStorage.setItem(key, value);
   }
   manager.remove = function(key){
      return localStorage.removeItem(key);
   }
   return manager;
}());

var jobMng = (function(sm){

   var manager = {};

   manager.store = function(job){
      var jobs = JSON.parse(sm.get(sm.dbKey));
      if( jobs == null || jobs == undefined) jobs = [];
      jobs.unshift(job);      
      sm.put(sm.dbKey, JSON.stringify(jobs));
   }

   manager.getAllApplied = function(){
      console.log("all jobs :" + JSON.parse(sm.get(sm.dbKey)));
      return JSON.parse(sm.get(sm.dbKey));
   }

   return manager;

}(storageMng));

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
   // First, validate the message's structure
   if ((msg.from === 'applyd_popup') && (msg.subject === 'storeJobInfo')) {
     console.log(msg.job);
     jobMng.store(msg.job);
     response({res: "Info Stored"});
   }
 });

 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(tab.url.indexOf("www.linkedin.com/jobs/view") !== -1 || tab.url.indexOf("www.linkedin.com/jobs/search") !== -1 
        || tab.url.indexOf("www.indeed.com/jobs") !== -1){
        chrome.pageAction.show(tab.id);
    }else{
        chrome.pageAction.hide(tab.id, function(){
          if (chrome.runtime.lastError)
            console.log(chrome.runtime.lastError.message);
        });
    }
 });
