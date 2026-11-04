
import { NativeTabs } from "expo-router/native-tabs";

export default function TabLayout() {
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
