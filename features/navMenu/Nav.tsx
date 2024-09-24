import * as Icon from "@mui/icons-material";
import { AppBar, Box, IconButton, Menu, MenuItem, MenuList, Toolbar } from "@mui/material";
import { useState } from "react";
import { resetLoginToInitialState, selectToken } from "../login/login.slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetBooksToInitialState } from "../books/booksSlice";
import styles from "./Nav.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

function Nav() {
  const loginToken = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const [ anchorEl, setAnchorEl ] = useState<HTMLElement|null>(null);
  const open = Boolean(anchorEl);
  const t = useTranslations();
  const router = useRouter();

  function onLogout() {
    dispatch(resetBooksToInitialState());
    dispatch(resetLoginToInitialState());
  }

  function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function changeLanguage(lng: string) {
    const { pathname, asPath, query } = router;
    router.push({pathname, query}, asPath, { locale: lng });

    handleMenuClose();
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}>
          <Icon.Language />
        </IconButton>
        <Menu
          className={styles.navMenu}
          open={open}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          keepMounted>
          <MenuList disablePadding>
            <MenuItem dense onClick={() => changeLanguage('de')}>
              de
            </MenuItem>
            <MenuItem dense onClick={() => changeLanguage('en')}>
              en
            </MenuItem>
          </MenuList>
        </Menu>
        <Box sx={{flexGrow: 1}} />
        {/* { !loginToken && '' <Link to={'/login' + window.location.search} style={{color: 'inherit'}}><Icon.Login /></Link> } */}
        {/* { loginToken && <IconButton color="inherit" onClick={onLogout}><Icon.Logout /></IconButton> } */}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
