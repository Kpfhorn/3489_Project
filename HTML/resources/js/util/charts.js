requirejs(["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"]);
requirejs(["/res/js/util/requests.js"]);
const chartTemplate = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: []
    },

    // Configuration options go here
    options: {
        legend: {
            display: true,
            labels: {
                fontColor: '#FFFFFF'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: '#FFFFFF'
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: '#FFFFFF'
                }
            }]
        }

    }
};

define(['./requests.js'], function(requests){
    return {
        requests: requests,

        loadChart: function (ID, field) {
            let options = chartTemplate;
            let data = {
                id: ID,
                field: field
            };
            requests.post('/api/chart', data, function (payload) {
                options.data.labels = payload.labels;
                options.data.datasets[0] = {
                    label: payload.ID,
                    borderColor: '#FFFFFF',
                    lineTension: 0,
                    fill: false,
                    data: payload.prices,
                };
                const ctx = $(payload.field);
                let chart = new Chart(ctx, options);
            });
        },
        loadCustomChart(IDS, field){
            let options = chartTemplate;
            let data = {
                IDs: IDS,
                field: field
            }
            requests.post('/api/charts', data, function(payload){
                console.log(payload);
                options.data.labels = payload.data[0].labels;
                payload.data.forEach(function(item){
                    options.data.datasets.push({
                        label: item.ID,
                        borderColor: '#FFFFFF',
                        lineTension: 0,
                        fill: false,
                        data: item.prices,
                    });
                })
            })
            const ctx = $(field);
            let chart = new Chart(ctx, options);
        }

    }
});