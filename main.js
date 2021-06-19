$(document).ready(function () {

    var dataSet=[{

        
    }]

    var dataSet = [{
            "name": "Tiger Nixon",
            "position": "System Architect",
            "salary": "$3,120",
            "start_date": "2011/04/25",
            "office": "Edinburgh",
            "extn": "5421",
        },
        {
            "name": "Garrett Winters",
            "position": "Director",
            "salary": "$5,300",
            "start_date": "2011/07/25",
            "office": "Edinburgh",
            "extn": "8422",

        }
    ]
    editor = new $.fn.dataTable.Editor({
        table: "#table_id",
        idSrc: 'name',
        fields: [{
                label: "Name",
                name: 'name'
            }, {
                label: "position",
                name: 'position',
                type: 'select',
                multiple: true,
                separator: ',',
                options: [
                    "Mr",
                    "Ms",
                    "Mrs",
                    "Miss",
                    "Dr"
                ]
            },
            {
                label: "salary",
                name: 'salary'
            },
            {
                label: "start_date",
                name: 'start_date'
            },
            {
                label: "office",
                name: 'office'
            }
        ]
    });

    // editor.add( {
    //     type:  "select",
    //     label: "name:",
    //     name:  "name",
    //     options: [
    //         "Mr",
    //         "Ms",
    //         "Mrs",
    //         "Miss",
    //         "Dr"
    //     ]
    // } );
    editor.dependent( 'position', function ( val ) {
        return val === 'Mr' ?
            { hide: ['salary'] } :
            { show: ['salary'] };
    } );
    $('#table_id').DataTable({
        data: dataSet,
        columns: [{
                data: 'name'
            },
            {
                data: 'position'
            },
            {
                data: 'salary'
            },
            {
                data: 'office'
            }
        ],
        dom: "Bfrtip",
        select: true,
        buttons: [{
                extend: "create",
                editor: editor
            },
            {
                extend: "edit",
                editor: editor
            },
            {
                extend: "remove",
                editor: editor
            }
        ]
    });



});


