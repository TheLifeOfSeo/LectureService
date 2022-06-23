let majorSelection = $("#major");
let majorDetailSelection = $("#major-detail");
let ageSelection = $("#age");
let zeroSelection = $("#zeroCheck");
let selectedMajor = majorSelection.val();
let selectedMajorDetail = majorDetailSelection.val();
let selectedMajorKey;
let searchData;

let defaultButton = $("#button-default");
let sortingSelected = defaultButton.val();
let incButton = $("#button-inc");
let incButtonValue = incButton.val();
let decButton = $("#button-dec");
let decButtonValue = decButton.val();




defaultButton.on("click", () => {
    console.log("안녕");
    $("#table tfoot").empty();
    $.ajax({
        url:"/sortdefault",
        type: "GET",
        data: {
            valueKey: sortingSelected
        },
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
                <tr>
                <td id="lec_name" colspan="2">
                    <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
                        ${_row.과목명}
                    </a>
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                    ${_row.강의평점 == "0" ? "-" : ((_row.강의평점 - 1) * 25).toFixed(1) + "%"}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                            _row.교수명.match(',')
                            ? _row.교수명.split(',', 1) +
                            " 외 " +
                            (_row.교수명.split(',').length - 1) +
                            "명"
                            : _row.교수명
                        }
                    </h5>
                </td>
                <td>
                    <h5 id="division">
                        ${_row.전공구분}
                    </h5>
                </td>
            </tr>
        `);

            $("#table tfoot").append(row);
        });
});
});

incButton.on("click", () => {

    $("#table tfoot").empty();
    $.ajax({
        url:"/sortasc",
        type: "GET",
        data: {
            valueKey: sortingSelected,
            sortKey: incButtonValue,
        },
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
                <tr>
                <td id="lec_name" colspan="2">
                    <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
                        ${_row.과목명}
                    </a>
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                    ${_row.강의평점 == "0" ? "-" : ((_row.강의평점 - 1) * 25).toFixed(1) + "%"}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                            _row.교수명.match(',')
                            ? _row.교수명.split(',', 1) +
                            " 외 " +
                            (_row.교수명.split(',').length - 1) +
                            "명"
                            : _row.교수명
                        }
                    </h5>
                </td>
                <td>
                    <h5 id="division">
                        ${_row.전공구분}
                    </h5>
                </td>
            </tr>
        `);

            $("#table tfoot").append(row);
        });
})
});

decButton.on("click", () => {

    $("#table tfoot").empty();
    $.ajax({
        url:"/sortdec",
        type: "GET",
        data: {
            valueKey: sortingSelected,
            sortKey: decButtonValue,
        }
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
                <tr>
                <td id="lec_name" colspan="2">
                    <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
                        ${_row.과목명}
                    </a>
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                    ${_row.강의평점 == "0" ? "-" : ((_row.강의평점 - 1) * 25).toFixed(1) + "%"}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                            _row.교수명.match(',')
                            ? _row.교수명.split(',', 1) +
                            " 외 " +
                            (_row.교수명.split(',').length - 1) +
                            "명"
                            : _row.교수명
                        }
                    </h5>
                </td>
                <td>
                    <h5 id="division">
                        ${_row.전공구분}
                    </h5>
                </td>
            </tr>
        `);

            $("#table tfoot").append(row);
        });
})
});





majorSelection.on("change", () => {
    selectedMajorKey = "단과대학";
    selectedMajor = majorSelection.val();
    let selectedAge = ageSelection.val();
    $("#table tfoot").empty();

    categoryChange(selectedMajor);

    $.ajax({
        url: "/majorstats",
        type: "GET",
        data: {
            majorKey: selectedMajorKey,
            majorValue: selectedMajor,
        },
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
                <tr>
                <td id="lec_name" colspan="2">
                    <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
                        ${_row.과목명}
                    </a>
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                    ${_row.강의평점 == "0" ? "-" : ((_row.강의평점 - 1) * 25).toFixed(1) + "%"}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                            _row.교수명.match(',')
                            ? _row.교수명.split(',', 1) +
                            " 외 " +
                            (_row.교수명.split(',').length - 1) +
                            "명"
                            : _row.교수명
                        }
                    </h5>
                </td>
                <td>
                    <h5 id="division">
                        ${_row.학과 + " - "}
                        ${_row.전공구분}
                    </h5>
                </td>
            </tr>
        `);

            $("#table tfoot").append(row);
        });
    });
});





majorDetailSelection.on("change", () => {
    selectedMajorKey = "학과";
    selectedMajorDetail = majorDetailSelection.val();
    let selectedAge = ageSelection.val();
    $("#table tfoot").empty();
    $.ajax({
        url: "/majorstats",
        type: "GET",
        data: {
            majorKey: selectedMajorKey,
            majorValue: selectedMajorDetail,
        },
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
                <tr>
                <td id="lec_name" colspan="2">
                    <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
                        ${_row.과목명}
                    </a>
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                    ${_row.강의평점 == "0" ? "-" : ((_row.강의평점 - 1) * 25).toFixed(1) + "%"}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                            _row.교수명.match(',')
                            ? _row.교수명.split(',', 1) +
                            " 외 " +
                            (_row.교수명.split(',').length - 1) +
                            "명"
                            : _row.교수명
                        }
                    </h5>
                </td>
                <td>
                    <h5 id="division">
                        ${_row.학과 + " - "}
                        ${_row.전공구분}
                    </h5>
                </td>
            </tr>
        `);
    
                $("#table tfoot").append(row);
            });
        });
    });



ageSelection.on("change", () => {
    let selectedMajor = majorSelection.val();
    let selectedMajorDetail = majorDetailSelection.val();
    let selectedAge = ageSelection.val();
    $("#table tfoot").empty();

    categoryChange(selectedAge);

    $.ajax({
        url: "/statsAge",
        type: "GET",
        data: {
            majorKey: "학년",
            majorValue: selectedAge,
        },
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
            <tr>
                <td id="lec_name" colspan="2">
                    <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
                    ${_row.과목명}
                    </a>
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                    ${_row.강의평점 == "0" ? "-" : ((_row.강의평점 - 1) * 25).toFixed(1) + "%"}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                            _row.교수명.match(',')
                            ? _row.교수명.split(',', 1) +
                            " 외 " +
                            (_row.교수명.split(',').length - 1) +
                            "명"
                            : _row.교수명
                        }
                    </h5>
                </td>
                <td>
                    <h5 id="division">
                        ${_row.학과 + " - "}
                        ${_row.전공구분}
                    </h5>
                </td>
            </tr>
        `);

            $("#table tfoot").append(row);
        });
    });
});


zeroSelection.on("change", (e) => {
    let checked = e.target.checked;
    console.log(checked);
    console.log(e);
    $("#table tfoot").empty();
    $.ajax({
        url: "/majorstats",
        type: "GET",
        data: {
            majorKey: selectedMajorKey,
            majorValue: selectedMajor,
            disableZero: checked,
        },
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
                <tr>
                <td id="lec_name" colspan="2">
                    <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
                        ${_row.과목명}
                    </a>
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                    ${_row.강의평점 == "0" ? "-" : ((_row.강의평점 - 1) * 25).toFixed(1) + "%"}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                            _row.교수명.match(',')
                            ? _row.교수명.split(',', 1) +
                            " 외 " +
                            (_row.교수명.split(',').length - 1) +
                            "명"
                            : _row.교수명
                        }
                    </h5>
                </td>
                <td>
                    <h5 id="division">
                        ${_row.학과 + " - "}
                        ${_row.전공구분}
                    </h5>
                </td>
            </tr>
        `);

            $("#table tfoot").append(row);
        });
    });
});



// searchData.on("click", () => {
//     $("#table tfoot").empty();
//     $.ajax({
//         url: "/majorstats",
//         type: "GET",
//         data: {
//             majorKey: selectedMajorKey,
//             majorValue: selectedMajor,
//         },
//     }).done((res) => {
//         res.forEach((_row) => {
//             let row = $(`
//                 <tr>
//                 <td id="lec_name" colspan="2">
//                     <h5><a href="/stats?lecCode=${_row.id}" id="lec_title">
//                         ${_row.과목명}
//                     </a>
//                     </h5>
//                 </td>
//                 <td id="rate" rowspan="2">
//                     <h5>
//                         ${(_row.강의평점 * 20).toFixed(1) + "%"}
//                     </h5>
//                 </td>
//             </tr>
//             <tr>
//                 <td>
//                     <h5 id="teacher">
//                         ${
//                             _row.교수명.length > 1
//                             ? _row.교수명 +
//                             " 외 " +
//                             (_row.교수명.length - 1) +
//                             "명"
//                             : _row.교수명
//                         }
//                     </h5>
//                 </td>
//                 <td>
//                     <h5 id="division">
//                         ${_row.학과 + " - "}
//                         ${_row.전공구분}
//                     </h5>
//                 </td>
//             </tr>
//         `);

//             $("#table tfoot").append(row);
//         });
//     });
// });