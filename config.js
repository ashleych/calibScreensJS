$(document).ready(function () {


    var dataSet = [

        {
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
            "Method": "Nelder-Mead"
        },
        {
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
            "Method": "Nelder-Mead"
        }

    ]
    editor = new $.fn.dataTable.Editor({
        table: "#table_id",
        idSrc: 'ID',
        fields: [{
                label: "LinkageName",
                name: 'LinkageName'
            }, {
                label: "Model",
                name: 'Model',
                type: 'select',
                multiple: true,
                separator: ',',
                options: [
                    "TTC Calibration",
                    "PIT Calibration"
                ]
            }, {
                label: 'Min_function',
                name: "Min_function",
                type: 'select',
                multiple: false,
                options: ["hl_test",
                    "mape",
                    "mse",
                    "ltdr",
                    "TTCShift",
                    "TTCShift",
                    "QuasiMomentMatchin"
                ]
            },
            {
                label: 'Portfolio',
                name: "Portfolio",
                type: 'select',
                multiple: true,
                options: ["Corporate","Retail","SME"
                ]
            },
            {
                label: "Total",
                name: 'Total'
            }
        ]
    });

    editor.dependent('Model', function (val) {
        if (val === "PIT Calibration" && editor.get('LinkageName') === 'corp_pd_v1' ) 
        {
            return {
                hide: ['Total', 'Min_function']
            }
        }
        else

    return        {
            show: ['Total', 'Min_function']
        }
        // return val === 'TTC Calibration' ? {
        //     hide: ['Total', 'Min_function']
        // } : {
        //     show: ['Total', 'Min_function']
        // };
    });




    $('a.editor-create').on('click', function (e) {
        e.preventDefault();

        editor.create({
            title: 'Create new record',
            buttons: 'Add'
        });
    });

    // Edit record
    $('#table_id').on('click', 'td.editor-edit', function (e) {
        e.preventDefault();

        editor.edit($(this).closest('tr'), {
            title: 'Edit record',
            buttons: 'Update'
        });
    });

    // Delete a record
    $('#table_id').on('click', 'td.editor-delete', function (e) {
        e.preventDefault();

        editor.remove($(this).closest('tr'), {
            title: 'Delete record',
            message: 'Are you sure you wish to remove this record?',
            buttons: 'Delete'
        });
    });
    editor.field('LinkageName').input().addClass('LinkageNameClass');
    // editor.field( 'LinkageName' ).input().before('<div class=\"input-group-prepend\"><span class=\"input-group-text\">$</span></div>');
    editor.field('LinkageName').input().before('<div class=\"input-group-prepend  testing\"><span class=\"input-group-text\">$</span></div>');

    $('#table_id').DataTable({
        data: dataSet,
        columns: [{data:"ID", title: "ID"},
        {data:"LinkageName", title: "Linkage Name"},
        {data:"FactorDriver" , title: "Factor Driver" },
        {data:"Model" , title: "Model" },
        {data:"Portfolio" , title: "Portfolio" },
        {data:"Total" , title: "Total" },
        {data:"N_Defaults" , title: "N_Defaults" },
        {data:"Smoothed_PD" , title: "Smoothed_PD" },
        {data:"Floor" , title: "Floor" },
        {data:"TargetCentralTendency" , title: "TargetCentralTendency" },
        {data:"Min_function" , title: "Min_function" },
        {data:"Method" , title: "Method" },
        { data: null, className: "dt-center editor-edit", defaultContent: '<i class="fa fa-pencil"/>', orderable: false },
        { data: null, className: "dt-center editor-delete", defaultContent: '<i class="fa fa-trash"/>', orderable: false }
        ],
        dom: "Bfrtip",
        select: true,
        buttons:[]

    });


    // $('#table_id').on('change',".LinkageNameClass",function (event) {
    //     alert("The paragraph was clicked.");
    // });

});
$(document).on('click', '.LinkageNameClass', function (event) {
    alert("The modeal was clicked.");

});