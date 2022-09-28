const charCharacterName = document.getElementById("charCharacterName");
const charServerNo = document.getElementById("charServerNo");
const charButton = document.getElementById("charButton");

charButton.addEventListener("click", async () => {
  const name = charCharacterName.value;
  const server = charServerNo.value;

  if (name !== "" || server !== "") {
    const res = await api.createFile({
      name,
      server,
    });
  }

  charCharacterName.value = "";
  charServerNo.value = "";
});

// Language: javascript
// CreateTableData
const createTableData = (tableData) => {
  const table = document.getElementById("table");
  const tableBody = document.createElement("tbody");

  tableData.forEach(function (rowData) {
    const row = document.createElement("tr");

    rowData.forEach(function (cellData) {
      const cell = document.createElement("td");
      const button = document.createElement("button");
      cell.appendChild(document.createTextNode(cellData));
      cell.classList.add("border", "p-2");

      if (cellData == rowData[0]) {
        button.innerHTML = "X";
        button.classList.add(
          "p-2",
          "bg-red-500",
          "text-white",
          "font-bold",
          "hover:bg-red-700",
          "w-full"
        );

        row.appendChild(button);
      }

      button.addEventListener("click", async () => {
        const res = await api.deleteFile(cellData);
        if (res) {
          location.reload();
        }
      });

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
};

window.addEventListener("load", () => {
  GetFileData();
});

const GetFileData = async () => {
  result = api.readFile();
  tempArray = new Array();
  result.then((data) => {
    const array = data.split(",,");
    array.forEach((element) => {
      tempArray.push(element.split(","));

      if (array.indexOf(element) == array.length - 2) {
        createTableData(tempArray);
      }
    });
  });
};
