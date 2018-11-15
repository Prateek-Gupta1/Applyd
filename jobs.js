(function(){

   function populateStats(xData, yData){
      console.log(xData);
      const ctx = document.getElementById('stats');
      const cdata = {
      // Labels should be Date objects
      labels: xData,
      datasets: [{
            fill: false,
            label: 'Jobs Applied',
            data: yData,
            borderColor: '#fe8b36',
            backgroundColor: '#fe8b36',
            lineTension: 0,
      }]
      }
      const options = {
      type: 'line',
      data: cdata,
      options: {
            fill: false,
            responsive: true,
            scales: {
                  xAxes: [{
                  type: 'time',
                  time:{
                     unit: 'month',
                     displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                  },
                  display: true,
                  scaleLabel: {
                        display: true,
                        labelString: "Date",
                  }
                  }],
                  yAxes: [{
                  ticks: {
                        beginAtZero: true,
                  },
                  display: true,
                  scaleLabel: {
                        display: true,
                        labelString: "Jobs Applied",
                  }
                  }]
            }
            }
      }
      const chart = new Chart(ctx, options);
   }   

   $(document).ready(function(){
      var main = chrome.extension.getBackgroundPage();
      var jobs = main.jobMng.getAllApplied();
      var tbod = ''
      var dates = {};
      var source = { "LinkedIn": 0, "Indeed": 0};

      $.each(jobs, function(i, job){
            tbod += '<tr><td>' + (i+1) + '</td><td>' + job.company + '</td><td>' + job.jobTitle + 
            '</td><td>' + job.location + '</td><td>' + job.date + '</td><td>' + job.src +
            '</td><td><textarea name="desc" rows="5" style="min-width: 100%">' + job.description + '</textarea></td></tr>';
            var dt = job.date;
            dates[dt] = dates[dt] === undefined ? 1 : dates[dt] + 1;
            source[job.src] = source[job.src] + 1;
      });

      $("#tbody").append(tbod);

      //Prepare table
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
            ],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]] 
      });

      //Prepare chart
      var xData = [];
      var yData = [];
      $.each(dates, function(k, v){
         obj = {x: new Date(k).valueOf(), y: v};
         xData.push( new Date(k));
         yData.push(v);
      })
      console.log(xData);
      populateStats(xData, yData);
   });
}());