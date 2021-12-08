import React from 'react';
import { VStack, Input, Icon, Heading } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ openList, searchProduct, focus, onBlur }) => {
  return (
    <VStack width='100%' space={5} alignItems='center'>
      <Heading fontSize='lg'>Cupertino</Heading>
      <Input
        onFocus={openList}
        onChangeText={(text) => searchProduct(text)}
        placeholder='Search'
        variant='filled'
        width='100%'
        bg='gray.100'
        borderRadius='20'
        marginBottom='5'
        py='1'
        px='2'
        placeholderTextColor='gray.500'
        _hover={{ bg: 'gray.200', borderWidth: 0 }}
        borderWidth='0'
        _web={{
          _focus: { style: { boxShadow: 'none' } },
        }}
        InputLeftElement={<AntDesign name='search1' size={24} color='black' />}
      />
      {focus ? (
        <AntDesign name='close' size={24} color='black' onPress={onBlur} />
      ) : null}
    </VStack>
  );
};

export default SearchBar;
