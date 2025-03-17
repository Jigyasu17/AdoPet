import { Pressable, Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";


export default function Index() {

  const {user} = useUser();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      {user?
       <Redirect href={'/(tabs)/home'}/>
       :<Redirect href={'/login'}/>
      
      }
   
    </View>
  );
}
