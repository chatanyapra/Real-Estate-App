import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/native-tabs";
import { Platform } from "react-native";
import { useUserStore } from "../../../../store/userStore";

function AndroidTabs() {
    const isAdmin = useUserStore((state) => state.isAdmin);

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => {
                        const iconColor =
                            typeof color === "number" ? String(color) : color ?? "#000";
                        return <Ionicons name="home" color={iconColor} size={size} />;
                    },
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, size }) => {
                        const iconColor =
                            typeof color === "number" ? String(color) : color ?? "#000";
                        return <Ionicons name="search" color={iconColor} size={size} />;
                    },
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Add",
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ color, size }) => {
                        const iconColor =
                            typeof color === "number" ? String(color) : color ?? "#000";
                        return <Ionicons name="add-circle" color={iconColor} size={size} />;
                    },
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    tabBarIcon: ({ color, size }) => {
                        const iconColor =
                            typeof color === "number" ? String(color) : color ?? "#000";
                        return <Ionicons name="heart" color={iconColor} size={size} />;
                    },
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => {
                        const iconColor =
                            typeof color === "number" ? String(color) : color ?? "#000";
                        return <Ionicons name="person" color={iconColor} size={size} />;
                    },
                }}
            />
        </Tabs>
    );
}

function IOSTabs() {
    const isAdmin = useUserStore((state) => state.isAdmin);
    return (
        // Creates the platform's native bottom tab bar
        <NativeTabs>

            {/* Home tab */}
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Icon
                    sf="house.fill"
                    md="home"
                />
                <NativeTabs.Trigger.Label>
                    Home
                </NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            {/* Search tab */}
            <NativeTabs.Trigger name="search">
                <NativeTabs.Trigger.Icon
                    sf="magnifyingglass"
                    md="search"
                />
                <NativeTabs.Trigger.Label>
                    Search
                </NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            {/* Saved tab */}
            <NativeTabs.Trigger name="saved">
                <NativeTabs.Trigger.Icon
                    sf="heart.fill"
                    md="favorite"
                />
                <NativeTabs.Trigger.Label>
                    Saved
                </NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            {/* Create Property */}
            {isAdmin && (
                <NativeTabs.Trigger name="create">
                    <NativeTabs.Trigger.Icon
                        sf="person.fill"
                        md="person"
                    />
                    <NativeTabs.Trigger.Label>
                        sdasdasdasd
                    </NativeTabs.Trigger.Label>
                </NativeTabs.Trigger>
            )}

            {/* Profile tab */}
            <NativeTabs.Trigger name="profile">
                <NativeTabs.Trigger.Icon
                    sf="person.fill"
                    md="person"
                />
                <NativeTabs.Trigger.Label>
                    Profile
                </NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

        </NativeTabs>
    );
}
export default function TabsLayout() {
    return Platform.OS === "ios" ? <IOSTabs /> : <AndroidTabs />;
    // return <AndroidTabs />
}