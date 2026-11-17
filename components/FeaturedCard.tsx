
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { formatPrice } from "../lib/utils";
import { Property } from "../types";

export default function FeaturedCard({
    property,
}: {
    property: Property;
}) {
    const router = useRouter();

    const imageUrl = property.images?.[0];

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                router.push(`/(root)/property/${property.id}`)
            }
            style={{
                width: 288,
                marginRight: 16,
                borderRadius: 24,
                overflow: "hidden",
                backgroundColor: "#FFFFFF",

                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 4,
                opacity: property.is_sold ? 0.5 : 1,
                marginBottom: 15
            }}
        >
            {/* Image Container */}
            <View
                style={{
                    width: "100%",
                    height: 176,
                    position: "relative",
                    backgroundColor: "#E5E7EB",
                }}
            >
                {/* Property Image */}
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        resizeMode="cover"
                    />
                ) : (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text>No image available</Text>
                    </View>
                )}

                {/* Property Type Badge */}
                <View
                    style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        zIndex: 10,
                        elevation: 10,

                        backgroundColor: "rgba(255,255,255,0.9)",
                        paddingHorizontal: 12,
                        paddingVertical: 5,
                        borderRadius: 50,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: "#2563EB",
                            textTransform: "capitalize",
                        }}
                    >
                        {property.type}
                    </Text>
                </View>

                {/* Sold Badge */}
                {property.is_sold && (
                    <View
                        style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 20,
                            elevation: 20,

                            backgroundColor: "#EF4444",
                            paddingHorizontal: 12,
                            paddingVertical: 5,
                            borderRadius: 50,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "600",
                                color: "#FFFFFF",
                            }}
                        >
                            Sold
                        </Text>
                    </View>
                )}
            </View>

            {/* Property Information */}
            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#1F2937",
                        marginBottom: 4,
                    }}
                    numberOfLines={1}
                >
                    {property.title}
                </Text>

                {/* Location */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <Ionicons
                        name="location-outline"
                        size={13}
                        color="#6B7280"
                    />

                    <Text
                        style={{
                            fontSize: 12,
                            color: "#6B7280",
                            marginLeft: 4,
                            flexShrink: 1,
                        }}
                        numberOfLines={1}
                    >
                        {property.address}, {property.city}
                    </Text>
                </View>

                {/* Price and Details */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            color: "#2563EB",
                            fontWeight: "700",
                            fontSize: 16,
                        }}
                    >
                        {formatPrice(property.price)}
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <Ionicons
                                name="bed-outline"
                                size={13}
                                color="#6B7280"
                            />
                            <Text style={{ fontSize: 12, color: "#6B7280" }}>
                                {property.bedrooms}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <Ionicons
                                name="water-outline"
                                size={13}
                                color="#6B7280"
                            />
                            <Text style={{ fontSize: 12, color: "#6B7280" }}>
                                {property.bathrooms}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
