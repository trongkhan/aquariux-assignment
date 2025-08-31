import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from "../const/enum/color";

interface Option {
  label: string;
  value: string;
}

interface CFilterListProps {
  options: Option[];
  selectedValue: string;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  onSelect: (value: string) => void;
  style?: object;
  buttonLabelStyle?: object;
}

const CFilterList: React.FC<CFilterListProps> = ({
  options,
  selectedValue,
  dropdownOpen,
  setDropdownOpen,
  onSelect,
  style = {},
  buttonLabelStyle = {},
}) => {
  return (
    <View style={[{ marginBottom: 8 }, style]}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={[styles.filterButtonText, buttonLabelStyle]}>
          {options.find(opt => opt.value === selectedValue)?.label || "Select"}
        </Text>
        <IonIcon name={dropdownOpen ? "arrow-down-outline" : "arrow-forward-outline"} size={16} color="#222" />
      </TouchableOpacity>
      {dropdownOpen && (
        <View style={{ backgroundColor: Colors.white, borderRadius: 8, elevation: 2, marginTop: 4, padding: 12 }}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt.value}
              style={{ padding: 12, backgroundColor: selectedValue === opt.value ? Colors.primary : Colors.white, borderRadius: 8 }}
              onPress={() => {
                onSelect(opt.value);
                setDropdownOpen(false);
              }}
            >
              <Text style={{ color: selectedValue === opt.value ? Colors.white : Colors.black }}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 1,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default CFilterList;
