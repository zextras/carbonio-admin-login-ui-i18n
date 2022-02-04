/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { FC, useEffect } from 'react';
import {
	addRoute,
	addSettingsView,
	addSearchView,
	addBoardView,
	setAppContext
} from '@zextras/carbonio-shell-ui';
import { useTranslation } from 'react-i18next';
import { MAIN_ROUTE, SECONDARY_ROUTE } from './constants';
import MainAppView from './views/app/main-view';
import SecondaryAppView from './views/app/secondary-view';
import MainSecondaryBarView from './views/secondary-bar/main-view';
import SecondaryPrimaryView from './views/primary-bar/secondary-view';
import SecondarySecondaryBarView from './views/secondary-bar/secondary-view';
import MainSettingsView from './views/settings/main-view';
import SecondarySettingsView from './views/settings/secondary-view';
import MainSearchView from './views/search/main-view';
import SecondarySearchView from './views/search/secondary-view';
import MainBoardView from './views/board/main-view';
import SecondaryBoardView from './views/board/secondary-view';

const App: FC = () => {
	const [t] = useTranslation();
	useEffect(() => {
		const label1 = t('label.app_name', 'Example App');
		const label2 = t('label.secondary_app', 'App Example');
		addRoute({
			route: MAIN_ROUTE,
			position: 1,
			visible: true,
			label: label1,
			primaryBar: 'CubeOutline',
			secondaryBar: MainSecondaryBarView,
			appView: MainAppView
		});
		addRoute({
			route: SECONDARY_ROUTE,
			position: 2,
			visible: true,
			label: label2,
			primaryBar: SecondaryPrimaryView,
			secondaryBar: SecondarySecondaryBarView,
			appView: SecondaryAppView
		});
		addSettingsView({
			route: MAIN_ROUTE,
			label: label1,
			component: MainSettingsView
		});
		addSettingsView({
			route: SECONDARY_ROUTE,
			label: label2,
			component: SecondarySettingsView
		});
		addSearchView({
			route: MAIN_ROUTE,
			component: MainSearchView
		});
		addSearchView({
			route: SECONDARY_ROUTE,
			component: SecondarySearchView
		});
		addBoardView({
			route: MAIN_ROUTE,
			component: MainBoardView
		});
		addBoardView({
			route: SECONDARY_ROUTE,
			component: SecondaryBoardView
		});
		setAppContext({ isMessageView: false });
	}, [t]);

	useEffect(() => {
		// registerActions({
		// id: 'new-mail',
		// type: ACTION_TYPES.NEW,
		// action: (route) => ({
		// 	id: 'new-mail',
		// 	label: t('messages.new_email', 'New e-mail'),
		// 	icon: 'CubeOutline',
		// 	click: () => {
		// 		getBridgedFunctions().addBoard(`${MAIN_ROUTE}/new?action=new`);
		// 	},
		// 	disabled: false,
		// 	primary: true,
		// 	group: MAIN_ROUTE
		// })
		// });
	}, [t]);

	return null;
};

export default App;
