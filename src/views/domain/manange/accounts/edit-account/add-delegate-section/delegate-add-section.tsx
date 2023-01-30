/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { FC, useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { Container, Input, Row, Text, Icon, Divider } from '@zextras/carbonio-design-system';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { useDomainStore } from '../../../../../../store/domain/store';
import { accountListDirectory } from '../../../../../../services/account-list-directory-service';

import { delegateRightsType, delegateWhereToStore } from '../../../../../utility/utils';
import { AccountContext } from '../../account-context';

const SelectItem = styled(Row)``;

const DelegateAddSection: FC = () => {
	const domainName = useDomainStore((state) => state.domain?.name);

	const [t] = useTranslation();
	const [delegateAccountList, setDelegateAccountList] = useState<any[]>([
		{ id: 'a1', label: 'aa' },
		{ id: 'a2', label: 'bb' }
	]);
	const [searchDelegateAccountName, setSearchDelegateAccountName] = useState('');
	const [isDelegateSelect, setIsDelegateSelect] = useState(false);
	const DELEGETES_RIGHTS_TYPE = useMemo(() => delegateRightsType(t), [t]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [offset, setOffset] = useState<number>(0);
	const [limit, setLimit] = useState<number>(20);
	const conext = useContext(AccountContext);
	const { accountDetail, deligateDetail } = conext;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const searchAccountList = useCallback(
		debounce((searchText) => {
			if (searchText) {
				setSearchQuery(
					`(|(mail=*${searchText}*)(cn=*${searchText}*)(sn=*${searchText}*)(gn=*${searchText}*)(displayName=*${searchText}*)(zimbraMailDeliveryAddress=*${searchText}*))`
				);
			} else {
				setSearchQuery('');
			}
		}, 700),
		[debounce]
	);

	useEffect(() => {
		searchAccountList(searchDelegateAccountName);
	}, [searchAccountList, searchDelegateAccountName]);

	const selectedDelegateAccount = (v: any): void => {
		setIsDelegateSelect(true);
		setSearchDelegateAccountName(v.name);
	};

	const getAccountList = useCallback((): void => {
		const type = 'accounts';
		const attrs =
			'displayName,zimbraId,zimbraAliasTargetId,cn,sn,zimbraMailHost,uid,zimbraCOSId,zimbraAccountStatus,zimbraLastLogonTimestamp,description,zimbraIsSystemAccount,zimbraIsDelegatedAdminAccount,zimbraIsAdminAccount,zimbraIsSystemResource,zimbraAuthTokenValidityValue,zimbraIsExternalVirtualAccount,zimbraMailStatus,zimbraIsAdminGroup,zimbraCalResType,zimbraDomainType,zimbraDomainName,zimbraDomainStatus,zimbraIsDelegatedAdminAccount,zimbraIsAdminAccount,zimbraIsSystemResource,zimbraIsSystemAccount,zimbraIsExternalVirtualAccount,zimbraCreateTimestamp,zimbraLastLogonTimestamp,zimbraMailQuota,zimbraNotes,mail';
		accountListDirectory(attrs, type, domainName, searchQuery, offset, limit).then((data) => {
			const accountListResponse: any = data?.account || [];

			if (accountListResponse && Array.isArray(accountListResponse)) {
				const accountListArr: any[] = [];
				data?.account.map((delegateAccount: any) =>
					accountListArr.push({
						id: delegateAccount.id,
						label: delegateAccount.name,
						customComponent: (
							<SelectItem
								top="9px"
								right="large"
								bottom="9px"
								left="large"
								style={{
									fontFamily: 'roboto',
									display: 'block',
									textAlign: 'left',
									height: 'inherit',
									padding: '3px',
									width: 'inherit'
								}}
								onClick={(): void => {
									selectedDelegateAccount(delegateAccount);
								}}
							>
								{delegateAccount?.name}
							</SelectItem>
						)
					})
				);
				setDelegateAccountList(accountListArr);
			}
		});
	}, [domainName, searchQuery, offset, limit]);

	useEffect(() => {
		getAccountList();
	}, [getAccountList, searchQuery]);

	return (
		<>
			<Container
				mainAlignment="flex-start"
				padding={{ left: 'large', right: 'extralarge', bottom: 'large' }}
			>
				<Row mainAlignment="flex-start" width="100%">
					<Row padding={{ top: 'large' }} width="100%" mainAlignment="space-between">
						<Text size="small" color="gray0" weight="bold">
							{t('account_details.abstract', `Abstract`)}
						</Text>
					</Row>
				</Row>
				<Row mainAlignment="flex-start" width="100%">
					<Row padding={{ top: 'large' }} width="100%" mainAlignment="space-between">
						<Text size="small" color="gray0" weight="bold">
							{
								<Trans
									i18nKey="account_details.deligate_abstract_text"
									defaults="The user {{granteeEmail}} will be able to send mails {{right}} {{targetEmail}}"
									components={{
										granteeEmail: deligateDetail?.grantee[0]?.name,
										targetEmail: accountDetail?.zimbraMailDeliveryAddress,
										right:
											deligateDetail?.right?.[0]?._content === 'sendAs'
												? t('account_details.as', 'as')
												: t('account_details.on_behalf_of', 'on behalf of')
									}}
								/>
							}
						</Text>
					</Row>
				</Row>
				<Row width="100%" padding={{ top: 'medium' }}>
					<Divider color="gray2" />
				</Row>
				<Row mainAlignment="flex-start" width="100%">
					<Row padding={{ top: 'large' }} width="100%" mainAlignment="space-between">
						<Input
							label={t('account_details.delegate_rights', 'Delegate Rights')}
							backgroundColor="gray5"
							defaultValue={
								DELEGETES_RIGHTS_TYPE.find(
									(item: any) => item.value === deligateDetail?.delegeteRights
								)?.label
							}
							value={
								DELEGETES_RIGHTS_TYPE.find(
									(item: any) => item.value === deligateDetail?.delegeteRights
								)?.label
							}
							// onChange={changeAccDetail}
							inputName="displayName"
							name="descriptiveName"
						/>
					</Row>
				</Row>
				{deligateDetail?.delegeteRights === 'read_mails_only' ? (
					<></>
				) : (
					<Row mainAlignment="flex-start" width="100%">
						<Row padding={{ top: 'large' }} width="100%" mainAlignment="space-between">
							<Input
								label={t('account_details.sendin_options', 'Sending Options')}
								backgroundColor="gray5"
								defaultValue={t(
									'account_details.send_recepients_see_the_mail',
									'Send {{right}} (recepients will see the mail from {{targetEmail}})',
									{
										granteeEmail: deligateDetail?.grantee?.[0]?.name,
										targetEmail: accountDetail?.zimbraMailDeliveryAddress,
										right:
											deligateDetail?.right?.[0]?._content === 'sendAs'
												? t('account_details.as', 'as')
												: t('account_details.on_behalf_of', 'on behalf of')
									}
								)}
								value={t(
									'account_details.send_recepients_see_the_mail',
									'Send {{right}} (recepients will see the mail from {{targetEmail}})',
									{
										granteeEmail: deligateDetail?.grantee?.[0]?.name,
										targetEmail: accountDetail?.zimbraMailDeliveryAddress,
										right:
											deligateDetail?.right?.[0]?._content === 'sendAs'
												? t('account_details.as', 'as')
												: t('account_details.on_behalf_of', 'on behalf of')
									}
								)}
								inputName="displayName"
								name="descriptiveName"
							/>
						</Row>
					</Row>
				)}
			</Container>
		</>
	);
};

export default DelegateAddSection;
