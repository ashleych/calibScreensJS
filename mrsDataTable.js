$(document).ready(function () {


    var dataSet = [{
        "ID": 1,
        "LinkageName": "corp_pd_v",
        "FactorDriver": "PD Calibration",
        "Model": "TTC Calibration",
        "Portfolio": "Corporate",
        "Total": "1,2,3,4",
        "N_Defaults": "4,5,6,6",
        "Smoothed_PD": "0.4,0.5,0.6",
        "Floor": 0.0003,
        "TargetCentralTendency": 10,
        "Min_function": "hl_test",
        "Method": "Nelder-Mead",
        "MasterRatingScale": "MRS1"
    }, {
        "ID": 2,
        "LinkageName": "corp_pd_v1",
        "FactorDriver": "PD Calibration",
        "Model": "PIT Calibration",
        "Portfolio": "Corporate",
        "Total": "1,2,3,4",
        "N_Defaults": "4,5,6,6",
        "Smoothed_PD": "0.4,0.5,0.6",
        "Floor": 0.0003,
        "TargetCentralTendency": 10,
        "Min_function": "hl_test",
        "Method": "Nelder-Mead",
        "MasterRatingScale": "MRS1"
    }]
    var mrsData = ["1+", "1", "1-", "2+", "2", "2-", "3+", "3", "3-", "4+", "4", "4-", "5+", "5", "5-", "6+", "6", "6-", "7+", "7", "7"]
    var TotalData = [0, 3, 0, 4, 9, 13, 18, 19, 16, 19, 19, 12, 9, 7, 79, 6, 4, 7, 4, 1, 7]
    var PD = [0.03, 0.03, 0.03, 0.04, 0.06, 0.08, 0.10, 0.14, 0.18, 0.25, 0.41, 0.46, 0.62, 0.84, 1.30, 1.52, 2.10, 3.55, 5.90, 15.50, 24.00]

    var optimisationOptions=["Nelder-Mead", "Brent Nelder-Mead", "BFGS", "CG", "L-BFGS-B", "SANN", "Bren"]

    var mrsDataObj = [];

    for (var i in mrsData) {

        mrsDataObj.push({
            "grades": mrsData[i],
            "total" :TotalData[i]*200,
            "PD":PD[i]
        });
    }

    var mrsTable = $('#mrsData').DataTable({
        data: mrsDataObj,
        columns: [{
            data: 'grades',
            title: "Grades"
        }],
        dom: "Bfrtip",
        select: true,
        buttons: [],
        "searching": false,
        "order": []

    });

    var PDTable = $('#PDModalTable').DataTable({
        data: mrsDataObj,
        columns: [{
            data: 'grades',
            title: "Grades"
        },{
            data: 'PD',
            title: "PD"
        },
    
    ],
        dom: "Bfrtip",
        select: true,
        buttons: [],
        "searching": false,
        "order": []

    });
    var CountTable = $('#CountTable').DataTable({
        data: mrsDataObj,
        columns: [{
            data: 'grades',
            title: "Grades"
        },{
            data: 'total',
            title: "Total",

        },
    
    ],
        dom: "Bfrtip",
        select: true,
        buttons: [],
        "searching": false,
        "order": []

    });



});