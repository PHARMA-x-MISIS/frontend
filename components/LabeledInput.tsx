import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface LabeledInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const LabeledInput = ({ label, error, ...rest }: LabeledInputProps) => {
  const isError = !!error; // true, если есть текст ошибки
  const borderColor = isError ? 'border-red-500' : 'border-gray-400 focus:border-blue-500';
  
  return (
    <View className="mb-4">
      <Text className="font-onest-semibold text-lg mb-2 text-black">{label}</Text>
      <TextInput
        className={`
          border-[1.5px] rounded-xl p-4 text-base font-onest-regular
          ${borderColor}
          text-black
        `}
        placeholderTextColor="#A2A2A2"
        {...rest}
      />
      {isError && (
        <Text className="text-red-500 mt-1 text-sm">{error}</Text>
      )}
    </View>
  );
};

export default LabeledInput;