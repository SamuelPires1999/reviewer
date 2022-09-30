import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const store = useStore();
  const navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box
            letterSpacing={5}
            fontWeight="bold"
            fontSize={18}
            onClick={() => navigate('/')}
            cursor="pointer"
          >
            Reviewer
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    {store.user ? (
                      `Logged as ${store.user.name}`
                    ) : (
                      <Link onClick={() => navigate('/login')}>Login</Link>
                    )}
                  </Center>
                  <br />
                  <MenuDivider />
                  {store.user ? (
                    <>
                      <MenuItem>Your Establishments</MenuItem>
                      <MenuItem>Your Reviews</MenuItem>
                      <MenuItem onClick={() => navigate('/register')}>
                        Account Settings
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          localStorage.removeItem('CHALLENGE-TOKEN');
                          store.setUser(undefined);
                          navigate('/');
                        }}
                      >
                        Logout
                      </MenuItem>
                    </>
                  ) : null}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
