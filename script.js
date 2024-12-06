let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");


purchaseBtn.addEventListener("click", () => {
  // total cid 
  const sumCid = parseFloat(
    cid
      .map((a) => a[1])
      .reduce((a, b) => a + b)
      .toFixed(2)
  );
  let result = { status: "OPEN", change: [] };
  let currencyUnit = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  //reverse cid 
  let units = cid.map((a) => a[1]).reverse();
  
  const formatResults = (status, change) => {
    changeDue.innerHTML = `<p>Status: ${status}</p>`;
    change.map(
      (m) => (changeDue.innerHTML += `<p>${m[0]}: $${m[1]}</p>`)
    );
    return;
  };
  let notes=cash.value
  if (notes < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (notes === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    result.status = "CLOSED";
    return;
  }
  let change = notes - price;
  let cid2 = cid.map((a) => a[0]).reverse(); // names
  if (change >= sumCid) {
    result.status = "CLOSED";
  }
  if (notes > price) {
    for (let i = 0; i < cid.length; i++) {
      if (change > 0 && change >= currencyUnit[i]) {
        let count = 0;
        while (change > 0 && change >= currencyUnit[i] && units[i]) {
          count++;
          change = parseFloat((change -= currencyUnit[i]).toFixed(2));
          units[i] = parseFloat((units[i] -= currencyUnit[i]).toFixed(2));
          console.log(change);
        }
        if (count > 0) {
          result.change.push([cid2[i], count * currencyUnit[i]]);
        }
      }
    }
  }
  if (change > 0.00) {
    return (changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }
  formatResults(result.status, result.change);
});