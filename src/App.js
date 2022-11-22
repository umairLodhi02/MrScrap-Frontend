import { Grommet, dark } from "grommet";
import { Component, useState } from "react";
import userContext from "./contexts/userContext";
import AppRoutes from "./routes/routes";
import { DatabaseService } from "./services/indexedDb";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionDetail: {
        username: "",
        email: "",
        password: "",
        profileImgUrl: "",
        accessToken: "",
        userId: "",
        contactNo: "",
        randomId: "",
        logout: false,
        currentLocation: {
          latitude: 0.0,
          longitude: 0.0,
        },
      },
    };
  }

  // getDataFromIndexdb = () => {
  //   DatabaseService.init().then(async () => {
  //     const response = await DatabaseService.getById(
  //       this.state.sessionDetail.randomId
  //     );
  //     if (response) {
  //       console.log({ response });
  //       this.setState({
  //         sessionDetail: { ...response },
  //       });
  //     } else {
  //       this.addToDatabase();
  //     }
  //   });
  // };

  // addToDatabase = async () => {
  //   DatabaseService.init().then(async () => {
  //     const response = await DatabaseService.add(this.state.sessionDetail);
  //   });
  // };

  // makeid = (length) => {
  //   var result = "";
  //   var characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   console.log("id using make func", result);
  //   return result;
  // };

  // setSession = (session) => {
  //   console.log(session);
  //   const { sessionDetail } = this.state;
  //   this.setState(
  //     {
  //       sessionDetail: { ...sessionDetail, ...session },
  //     },
  //     () => {}
  //   );
  // };

  clearSession = () => {
    console.log("clearsesss");

    this.setState({
      sessionDetail: {
        username: "",
        email: "",
        password: "",
        profileImgUrl: "",
        accessToken: "",
        logout: true,
      },
    });
  };

  // componentDidMount() {
  //   // const apps = window.mozActivity.getDeviceStorage;
  //   console.log("aps", navigator);

  //   // this.addToDatabase();
  //   try {
  //     this.getDataFromIndexdb();
  //   } catch (e) {
  //     alert("error");
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     JSON.stringify(this.state.sessionDetail) !==
  //     JSON.stringify(prevState.sessionDetail)
  //   ) {
  //     if (!this.state.logout) {
  //       this.addToDatabase();
  //       this.getDataFromIndexdb();
  //     }
  //   }
  // }

  // componentWillMount() {
  //   var getRandomId = localStorage.getItem("randomId");
  //   if (getRandomId) {
  //     this.setState({
  //       sessionDetail: {
  //         ...this.state.sessionDetail,
  //         ...{ randomId: getRandomId },
  //       },
  //     });
  //   } else {
  //     localStorage.setItem("randomId", this.makeid(16));
  //     this.setState({
  //       sessionDetail: {
  //         ...this.state.sessionDetail,
  //         ...{ randomId: localStorage.getItem("randomId") },
  //       },
  //     });
  //   }
  // }
  logout = () => {
    DatabaseService.init().then(async () => {
      try {
        const response = await DatabaseService.deleteById(
          this.state.sessionDetail.randomId
        );
        console.log(response);
        this.clearSession();
      } catch (err) {
        alert(err);
      }
    });
  };

  render() {
    return (
      <Grommet theme={dark} full>
        <userContext.Provider
          value={{
            session: this.state.sessionDetail,
            setSession: this.setSession,
            logout: this.logout,
          }}
        >
          <AppRoutes />
        </userContext.Provider>
      </Grommet>
    );
  }
}

export default App;
