import { ActivityIndicator, View } from "react-native";

export default function FooterList({ load }: { load: boolean }) {
    if(!load) return;

    return (
        <View style={{ marginVertical: 24 }}>
            <ActivityIndicator size={25} color="#121212" />
        </View>
    )
}