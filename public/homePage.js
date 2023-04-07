//const { response } = require("express");
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  const cb = (response) => {
    if (response.success) {
      location.reload();
    }
  }
  ApiConnector.logout(cb);
}
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
})
const ratesBoard = new RatesBoard();
const updateRatesBoard = () => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }

  });
}
updateRatesBoard();
setInterval(() => {
  updateRatesBoard();
}, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, cb = (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Баланс пополнен")
    }
    else {
      moneyManager.setMessage(response.error, "Ошибка баланс не пополнен")
    }
  });
}
moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, cb = (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Конвертирование выполнено")
    }
    else {
      moneyManager.setMessage(response.error, "Ошибка конвертирования")
    }
  });
}
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, cb = (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Перевод выполнен")
    }
    else {
      moneyManager.setMessage(response.error, "Ошибка. Перевод не выполнен")
    }
  });
}
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(cb = (response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, cb = (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь добавлен успешно")
    }
    else {
      favoritesWidget.setMessage(response.error, "Ошибка. Пользователь не добавлен")
    }
  });
}
favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, cb = (response) => {

    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь удален ")
    }
    else {
      favoritesWidget.setMessage(response.error, "Ошибка. Пользователь не удален")
    }
  });
}

