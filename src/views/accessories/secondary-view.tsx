/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Text } from '@zextras/carbonio-design-system';

const SecondaryAccessoryView: FC = () => {
	console.log('secondary accessory');
	const [t] = useTranslation();
	return (
		<Container background="info">
			<Text>{t('label.view', 'This is a view')}</Text>
		</Container>
	);
};
export default SecondaryAccessoryView;
