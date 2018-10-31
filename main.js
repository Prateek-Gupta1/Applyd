var storageMng = (function(){
   var manager = {
       dbKey: "applied"
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

   manager.store = function(job, callback){
      jobs = JSON.parse(sm.get(sm.dbKey));
      jobs.unshift(job);

      console.log(jobs);
      
      sm.put(sm.dbKey, JSON.stringify(jobs));
      callback({response: "OK"});
   }

   manager.getAllApplied = function(){
      return JSON.parse(sm.get(sm.dbKey));
   }

   return manager;

}(storageMng));

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
   // First, validate the message's structure
   if ((msg.from === 'applyd_popup') && (msg.subject === 'stroreJobInfo')) {
     jobMng.store(msg.job, response);
   }
 });

 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
   //console.log(tab.url.includes('www.linkedin.com/jobs/view'));
    if(tab.url.indexOf("www.linkedin.com/jobs/view") !== -1){
        chrome.pageAction.show(tab.id, function(){
          
        });
    }else{
        chrome.pageAction.hide(tab.id);
    }
 });
