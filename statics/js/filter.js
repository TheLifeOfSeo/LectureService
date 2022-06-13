let majorSelection = $(".major-selection");

majorSelection.on("change", () => {
    let selectedMajor = majorSelection.val();
    $("#table tfoot").empty();

    categoryChange(selectedMajor);

    $.ajax({
        url: "/stats",
        type: "GET",
        data: {
            major: selectedMajor,
        },
    }).done((res) => {
        res.forEach((_row) => {
            let row = $(`
                <tr>
                <td id="lec_name" colspan="2">
                    <h5>
                        ${_row.과목명}
                    </h5>
                </td>
                <td id="rate" rowspan="2">
                    <h5>
                        ${_row.강의평점 * 100 + "%"}
                    </h5>
                </td>
                <td id="rate_count" rowspan="2">
                    <h5>
                        ${_row.강의평점}
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 id="teacher">
                        ${
                          _row.교수명.length > 1
                            ? _row.교수명 +
                              "외" +
                              (_row.교수명.length - 1) +
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