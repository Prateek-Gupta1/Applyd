// Update the relevant fields with the new data
(function(){
  var jobInfo = {}

  function setDOMInfo(info) {
    console.log(info);
    $('#company').val(info.company);
    $('#jobTitle').val(info.jobTitle);
    $('#location').val(info.location);
    $('#description').val(info.description);

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day);
    $('#date').val(today);
    info.date = today;

    jobInfo = info;
  }
 
 // message the contentscript (scan.js) to scan the page and set the fields.
  function sendScanRequest(){
  // ...query for the active tab...
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'applyd_popup', subject: 'scanInfo', url: tabs[0].url},
            // ...also specifying a callback to be called 
            //    from the receiving end (content script)
            setDOMInfo)
      });
  }

  function storeJobInfo(job){
    chrome.runtime.sendMessage({from: 'applyd_popup', subject: 'storeJobInfo', job: job}, function(res){
      console.log(res);
    });
  }
  
  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', function () {
    // add listener on button to store the job details...
    $(document).ready(function(){
      $('#saveButton').click(function(){
        storeJobInfo(jobInfo);
      });
    })
    // ask content script to scan and send the job details...
    sendScanRequest();
  });

}());