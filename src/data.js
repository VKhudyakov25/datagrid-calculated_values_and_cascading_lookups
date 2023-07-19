export const employees = [
  { employeeId: 1, fullName: "Nancy Davolio" },
  { employeeId: 2, fullName: "Andrew Fuller" },
  { employeeId: 3, fullName: "Janet Leverling" },
];

export const countries = [
  { countryId: 1, name: "Switzerland", employeeId: 1 },
  { countryId: 2, name: "Germany", employeeId: 1 },
  { countryId: 3, name: "Canada", employeeId: 1 },
  { countryId: 4, name: "USA", employeeId: 2 },
  { countryId: 5, name: "Sweden", employeeId: 2 },
  { countryId: 6, name: "Japan", employeeId: 2 },
  { countryId: 7, name: "Australia", employeeId: 3 },
  { countryId: 8, name: "UK", employeeId: 3 },
  { countryId: 9, name: "France", employeeId: 3 },
];

export const orders = getOrders();

export const products = [
  {
    ProductID: 1,
    ProductName: "Camera",
    Price: 2300,
    Count: 4,
  },
  { ProductID: 2, ProductName: "TV", Price: 1200, Count: 6 },
  { ProductID: 3, ProductName: "Smartphone", Price: 900, Count: 16 },
];

function getOrders() {
  let arr = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 9; j++) {
      for (let k = 1; k <= 27; k++) {
        let data = {
          employeeId: i,
          countryId: j,
          orderId: k,
          orderName: `Order ${k}`,
        };
        arr.push(data);
        if (k % 3 === 0) j++;
        if (k % 9 === 0) i++;
      }
    }
  }
  return arr;
}
