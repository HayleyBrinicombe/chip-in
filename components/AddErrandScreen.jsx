import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { addErrand, addErrandToUser, getUsername } from "../firebase/config";

export default function AddErrandScreen({ navigation }) {
  const [timeFrame, setTimeFrame] = useState("- Select -");
  const [workType, setWorkType] = useState("- Select -");
  const [errandName, setErrandName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  function handleAddErrand() {
    return getUsername()
      .then((username) => {
        const errandDetails = {
          timeFrame,
          workType,
          errandName,
          description,
          requirements,
          location,
          date,
          author: username,
        };
        return errandDetails;
      })
      .then((errand) => {
        return addErrand(errand);
      })
      .then(({ errandID, errandUserId }) => {
        addErrandToUser(errandID, errandUserId);
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate("Splash");
  }

  return (
    <View>
      <Header />
      <ScrollView contentContainerStyle={styles.pageView}>
        <Text
          style={{
            marginLeft: 8,
            marginBottom: 10,
            marginTop: 10,
            fontSize: 16,
          }}
        >
          What is it you would like help with?
        </Text>
        <TextInput
          style={styles.titleField}
          onChangeText={setErrandName}
          value={errandName}
          placeholder="Errand Title"
        />
        <TextInput
          multiline={true}
          style={styles.descriptionField}
          onChangeText={setDescription}
          value={description}
          placeholder="Description of the work you need help with..."
        />
        <TextInput
          style={styles.genericInputField}
          onChangeText={setRequirements}
          value={requirements}
          placeholder="Requirements (optional)"
        />
        <TextInput
          style={styles.genericInputField}
          onChangeText={setLocation}
          value={location}
          placeholder="Location for the errand"
        />
        <TextInput
          style={styles.genericInputField}
          onChangeText={setDate}
          value={date}
          placeholder="Date (Format: August 9, 2022 at 12:00:00 AM UTC+1)"
        />
        <View style={styles.dropdownFlex}>
          <Picker
            style={styles.dropdownMenu}
            selectedValue={timeFrame}
            prompt={"How long will it take?"}
            onValueChange={(itemValue) => {
              setTimeFrame(itemValue);
            }}
          >
            <Picker.Item label="- Select -" value={0} />
            <Picker.Item label="Less than half an hour" value={0.5} />
            <Picker.Item label="Around an hour" value={1} />
            <Picker.Item label="A couple of hours" value={2} />
            <Picker.Item label="A few hours" value={3} />
            <Picker.Item label="Half a working day" value={4} />
            <Picker.Item label="A full day's work" value={8} />
          </Picker>
          <Text style={{ fontSize: 20, flex: 1, marginLeft: 10 }}>
            How long will it take?
          </Text>
        </View>
        <View style={styles.dropdownFlex}>
          <Picker
            style={styles.dropdownMenu}
            selectedValue={workType}
            prompt={"Pick the most relevant type"}
            onValueChange={(itemValue) => {
              setWorkType(itemValue);
            }}
          >
            <Picker.Item label="- Select -" value={"none"} />
            <Picker.Item label="Heavy Lifting" value={"heavy lifting"} />
            <Picker.Item label="Gardening" value={"gardening"} />
            <Picker.Item label="Shopping" value={"shopping"} />
            <Picker.Item label="Transportation" value={"transportation"} />
            <Picker.Item label="Entertainment" value={"entertainment"} />
            <Picker.Item label="Charity" value={"charity"} />
            <Picker.Item label="Dog Walking" value={"dog walking"} />
            <Picker.Item label="Construction" value={"construction"} />
          </Picker>
          <Text style={{ fontSize: 20, flex: 1, marginLeft: 10 }}>
            What type of work is involved?
          </Text>
        </View>
        <View style={styles.submitButtonFlex}>
          <Pressable style={styles.submitButton} onPress={handleAddErrand}>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Create Errand
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageView: {
    marginTop: 15,
  },
  genericInputField: {
    borderColor: "#000",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    width: 375,
    height: 35,
    margin: 8,
    textAlign: "left",
    padding: 5,
    fontSize: 15,
  },
  titleField: {
    borderColor: "#000",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    height: 35,
    margin: 8,
    textAlign: "left",
    padding: 5,
    fontSize: 15,
  },
  dropdownFlex: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  dropdownMenu: {
    backgroundColor: "#FFF",
    width: 200,
    marginLeft: 9,
  },
  descriptionField: {
    borderColor: "#000",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    width: 375,
    height: 80,
    margin: 8,
    textAlign: "left",
    textAlignVertical: "top",
    flexWrap: "wrap",
    padding: 5,
    fontSize: 15,
  },
  submitButtonFlex: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
  },
  submitButton: {
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: 125,
    margin: 10,
    padding: 10,
  },
});
