(function(){
   $(document).ready(function(){
      console.log("hello from jobs.js");
      var main = chrome.extension.getBackgroundPage();
      var jobs = main.jobMng.getAllApplied();
      console.log(jobs);
      var tbod = ''
      $.each(jobs, function(i, job){
            tbod += '<tr><td>' + (i+1) + '</td><td>' + job.company + '</td><td>' + job.jobTitle + 
            '</td><td>' + job.location + '</td><td>' + job.date + '</td><td>' + job.src +
            '</td><td><textarea name="desc" rows="5" style="min-width: 100%">' + job.description + '</textarea></td></tr>';
      });
      $("#tbody").append(tbod);
      $('#jobsTable').DataTable({
            "paging": true,
            "searching": true,
            "columnDefs": [{ orderable: false, targets: [6] }],
            "columns": [
                  { "width": "5%" },
                  { "width": "10%" },
                  { "width": "10%"},
                  { "width": "10%" },
                  { "width": "10%"},
                  { "width": "10%" },
                  { "width":  "45%"},
            ],
            dom: 'lBfrtip',
            buttons: [
                 'csv'
            ] 
      });
   });
}());