$(document).ready(function () {


    var dataSet = [{
        "ID": 1,
        "LinkageName": "corp_pd_ttc1",
        "FactorDriver": "PD Calibration",
        "ModelName": "TTC Calibration",
        "Portfolio": "Corporate",
        "Total": "Obligor_count_series",
        "N_Defaults": "4,5,6,6",
        "DefaultRate": "corp_defrate_series",
        "Floor": 0.0003,
        "TargetCentralTendency-TTC": 0.03,
        "TargetCentralTendency-PIT": "",
        "Min_function": "Hosmer-Lemeshow Test",
        'ttcLinkageName':"",
        "ttcUpdation" : 0,
        "Method": "Nelder-Mead",
        "MasterRatingScale": "MRS1"
    }, {
        "ID": 2,
        "LinkageName": "corp_pd_v1",
        "FactorDriver": "PD Calibration",
        "ModelName": "PIT Calibration",
        "Portfolio": "Corporate",
        "Total": "Obligor_count_series",
        "N_Defaults": "4,5,6,6",
        "DefaultRate": "corp_defrate_series",
        "Floor": 0.0003,
        "TargetCentralTendency-PIT": "NameOfmodelInPX1",
        "TargetCentralTendency-TTC": "",
        "Min_function": "Hosmer-Lemeshow Test",
        'ttcLinkageName':"corp_pd_ttc1",
        "ttcUpdation" :1,
        "Method": "Nelder-Mead",
        "MasterRatingScale": "MRS1",
    }]

    editor = new $.fn.dataTable.Editor({
        table: "#table_id",
        idSrc: 'ID',
        fields: [{
                label: "LinkageName",
                name: 'LinkageName'
            }, 
            {
                label: "ModelName",
                name: "ModelName",
                type: 'select',
                multiple: false,
                options: [
                    "TTC Calibration",
                    "PIT Calibration",
                    "Prepayment"
                ]
            },

            {
                label: 'Portfolio',
                name: "Portfolio",
                type: 'select',
                multiple: true,
                options: ["Corporate", "Retail", "SME"]
            },
            {
                label: 'Min_function',
                name: "Min_function",
                type: 'select',
                multiple: false,
                options: ["Hosmer-Lemeshow Test",
                    "MAPE",
                    "MSE",
                    "Long Term Default Rate",
                    "TTC Curve Shift",
                    "Quasi Moment Matching"
                ]
            },
            {
                label: "TTC Updation per period:",
                name:  "ttcUpdation",
                type:  "radio",
                options: [
                    { label: "Yes", value: 1 },
                    { label: "No",  value: 0 }
                ],
                def: 0
            }, 
            {
                label: "TTC Model Name",
                name:  "ttcLinkageName",
                type:  "select",multiple:false,
                options: ["corp_pd_ttc1","corp_pd_ttc2"
                ],
                def: 0
            }, 


            {
                label: 'Target Central Tendency(s)',
                name: "TargetCentralTendency-PIT",
                type: 'select',
                multiple: true,
                options: ["NameOfmodelInPX1", "NameOfmodelInPX2", "NameOfmodelInPX3"]            },
            {
                label: 'Target Central Tendency(s)',
                name: "TargetCentralTendency-TTC"
            },

            {
                label :'Floor',
                name: 'Floor'
            },

            
            {
                label: "Obligor Count",
                name: 'Total'
            },
            {
                label: "Master Rating Scale",
                name: 'MasterRatingScale',
                options: ["CorpMRS", "MRS1", "SME_MRS"]
            },
            {
                label: "Default Rates",
                name: 'DefaultRate',
                type:'readonly', attr:{ disabled:true } ,

            },
            {
                label: "Optimisation Method",
                name: 'Method',            
                type: 'select',
                multiple: false,
                options: ["Nelder-Mead", "Brent Nelder-Mead", "BFGS", "CG", "L-BFGS-B", "SANN", "Bren"]

            }
        ]
    });

    // editor.dependent('ModelName', function (val) {
    //     if (val === "PIT Calibration" && editor.get('LinkageName') === 'corp_pd_v1') {
    //         return {
    //             hide: ['Total', 'Min_function']
    //         }
    //     } else

    //         return {
    //             show: ['Total', 'Min_function']
    //         }
    //     // return val === 'TTC Calibration' ? {
    //     //     hide: ['Total', 'Min_function']
    //     // } : {
    //     //     show: ['Total', 'Min_function']
    //     // };
    // });

    // editor.dependent('ModelName', function (val) {

    //     return val === 'TTC Calibration' || val === 'PIT Calibration' ? {
    //         show: ['MasterRatingScale', 'Total', 'Min_function','DefaultRate','Method']
    //     } : {
    //         hide: ['MasterRatingScale', 'Total', 'Min_function','DefaultRate','Method']
    //     };
    // });

    editor.dependent('Min_function', function (val) {
        console.log(val);
        return  val === 'TTC Curve Shift' && editor.get('ModelName') === 'PIT Calibration' ? {
            show: ['ttcUpdation',"ttcLinkageName"]
        } : {
            hide: ['ttcUpdation',"ttcLinkageName"]
        };
    });

    editor.dependent('ModelName', function (val) {
        console.log("val");
        return val === 'PIT Calibration' && editor.get('Min_function') === 'TTC Curve Shift'  ? {
            show: ['ttcUpdation',"ttcLinkageName"]
        } : {
            hide : ['ttcUpdation',"ttcLinkageName"]
        };
    });
    editor.dependent('ModelName', function (val) {
        return val === 'PIT Calibration'  ? {
            show: ['MasterRatingScale','TargetCentralTendency-PIT']
        } : {
            hide : ['TargetCentralTendency-PIT','Total','DefaultRate']
        };
    });

    editor.dependent('ModelName', function (val) {
        console.log("val");
        return val === 'TTC Calibration'   ? {
            show: ['MasterRatingScale','TargetCentralTendency-TTC','Total','DefaultRate']
        } : {
            hide : ['TargetCentralTendency-TTC','Total','DefaultRate']
        };
    });
    // editor.dependent('ModelName', function (val) {
    //     console.log("val");
    //     return val === 'TTC Calibration'   ? {
    //         show: ['TargetCentralTendency-TTC']
    //     } : {
    //         hide : ['TargetCentralTendency-TTC']
    //     };
    // });




    $('a.editor-create').on('click', function (e) {
        e.preventDefault();

        editor.create({
            title: 'Add New',
            buttons: 'Add'
        });
    });

    // Edit record
    $('#table_id').on('click', 'td.editor-edit', function (e) {
        e.preventDefault();

        editor.edit($(this).closest('tr'), {
            title: 'Edit',
            buttons: 'Update'
        });
    });

    // Delete a record
    $('#table_id').on('click', 'td.editor-delete', function (e) {
        e.preventDefault();

        editor.remove($(this).closest('tr'), {
            title: 'Delete',
            message: 'Are you sure you wish to remove this record?',
            buttons: 'Delete'
        });
    });
    editor.field('LinkageName').input().addClass('LinkageNameClass');
    // editor.field( 'LinkageName' ).input().before('<div class=\"input-group-prepend\"><span class=\"input-group-text\">$</span></div>');
    // editor.field('Total').input().after('<span class=\"input-group-text\"> View</span>');
    // $('<a style="position:absolute;margin:0" href="#"> <i class="fa fa-eye" aria-hidden="true"></i> View </a>').insertAfter(
    //     editor.field('Total').input()
    // );
    $('<a  style="position:absolute;margin:0" href="#" data-toggle="modal" data-target="#CountModal"><i class="fa fa-eye" aria-hidden="true"></i> View</a>').insertAfter(
        editor.field('Total').input()
    );
    $('<a  style="position:absolute;margin:0" href="#" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-eye" aria-hidden="true"></i> View</a>').insertAfter(
        editor.field('MasterRatingScale').input()
    );
    $('<a  style="position:absolute;margin:0" href="#" data-toggle="modal" data-target="#PDModal"><i class="fa fa-eye" aria-hidden="true"></i> View</a>').insertAfter(
        editor.field('DefaultRate').input()
    );
 
 
    $('#table_id').DataTable({
        data: dataSet,
        columns: [{ data: "ID", title: "ID" }, { data: "LinkageName", title: "Linkage Name" }, { data: "FactorDriver", title: "Factor Driver" }, 
        { data: "ModelName", title: "ModelName" }, { data: "Portfolio", title: "Portfolio" },
          { data: null, className: "dt-center editor-edit", defaultContent: '<i class="fa fa-pencil"/>', orderable: false }, { data: null, className: "dt-center editor-delete", defaultContent: '<i class="fa fa-trash"/>', orderable: false } ],
        dom: "Bfrtip",
        select: true,
        buttons:[]

    });

});



