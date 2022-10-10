/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import {
	Container,
	Modal,
	Text,
	Button,
	Padding,
	Row,
	Input,
	Icon,
	SnackbarManagerContext
} from '@zextras/carbonio-design-system';
import React, { FC, useCallback, useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ListRow from '../../../list/list-row';

const DeleteHsmPolicy: FC<{
	showDeletePolicyView: boolean;
	setShowDeletePolicyView: any;
	selectedPolicies: any;
	onDeletePolicy: any;
	isRequestInProgress: boolean;
}> = ({
	showDeletePolicyView,
	setShowDeletePolicyView,
	selectedPolicies,
	onDeletePolicy,
	isRequestInProgress
}) => {
	const [t] = useTranslation();
	const createSnackbar: any = useContext(SnackbarManagerContext);
	const copyToClipboard = useCallback(() => {
		if (navigator) {
			navigator.clipboard.writeText(selectedPolicies);
			createSnackbar({
				type: 'info',
				label: 'HSM Policy 4 has been copied to the clipboard',
				autoHideTimeout: 2000,
				actionLabel: ''
			});
		}
	}, [createSnackbar, selectedPolicies]);

	const closeHandler = useCallback(() => {
		setShowDeletePolicyView(false);
	}, [setShowDeletePolicyView]);

	const onDelete = useCallback(() => {
		onDeletePolicy();
	}, [onDeletePolicy]);

	return (
		<Modal
			size="medium"
			title={t('hsm.delete_hsm_policy', 'Delete HSM Policy?')}
			open={showDeletePolicyView}
			customFooter={
				<Container orientation="horizontal" mainAlignment="space-between">
					<Button
						style={{ marginLeft: '10px' }}
						type="outlined"
						label={t('label.help', 'Help')}
						color="primary"
					/>
					<Row style={{ gap: '8px' }}>
						<Button label={t('label.cancel', 'Cancel')} color="secondary" onClick={closeHandler} />
						<Button
							label={t('hsm.delete', 'Delete')}
							color="error"
							onClick={onDelete}
							disabled={isRequestInProgress}
						/>
					</Row>
				</Container>
			}
			showCloseIcon
			onClose={closeHandler}
		>
			<Container padding={{ all: 'extralarge' }}>
				<Container padding={{ top: 'small' }}>
					<Padding bottom="medium">
						<Text size={'extralarge'} overflow="break-word">
							<Trans
								i18nKey="hsm.delete_hsm_policy_confirm_msg_1"
								defaults="If you delete this HSM policy you won`t be able to restore it. Do you want to delete HSM Policy?"
							/>
						</Text>
					</Padding>
				</Container>

				<Container
					padding={{ top: 'small', bottom: 'small' }}
					orientation="flex-start"
					mainAlignment="flex-start"
				>
					<Text size="small">
						<Trans
							i18nKey="hsm.copy_hsm_policy_from_clipboard_msg"
							defaults="If you`re unsure you can copy the policy string to the clipboard to restore it later."
						/>
					</Text>
				</Container>

				<Container padding={{ top: 'small', bottom: 'small' }}>
					<Input
						background="gray5"
						label={t('hsm.hsm_policy', 'HSM Policy')}
						value={selectedPolicies}
						CustomIcon={(): any => (
							<Icon icon="CopyOutline" size="large" color="grey" onClick={copyToClipboard} />
						)}
					/>
				</Container>
			</Container>
		</Modal>
	);
};

export default DeleteHsmPolicy;
