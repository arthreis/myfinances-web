import React, { useEffect, useCallback } from 'react';

import income from '@/assets/income.svg';
import outcome from '@/assets/outcome.svg';

import Header from '@/components/Header';
import DashboardGraphView from './DashboardGraphView';
import DashboardTableView from './DashboardTableView';

import formatValue from '@/utils/formatValue';

import type { Balance } from '@/schemas';

import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import Burger from '@/components/Burger';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import PeriodDate from '@/components/PeriodDate';
import { useTheme } from '@/hooks/theme';
import { getBalance } from '@/services/transaction/get-balance';
import FormTransaction from './FormTransaction';
import { Balance as BalanceValue, Card, CardContainer, Container, TitleAndViewSelector } from './styles';
import SvgTotal from '@/assets/total.svg?react';

function Home(): React.JSX.Element {
  const [balance, setBalance] = React.useState<Balance>({} as Balance);
  const [view, setView] = React.useState<'table' | 'graph'>('table');
  const [period, setPeriod] = React.useState<Date>(new Date());
  const [isShowingModal, setIsShowingModal] = React.useState<boolean>(false);
  const [seed, setSeed] = React.useState<number>(1);
  const [open, setOpen] = React.useState(true);

  const { theme } = useTheme();
  const location = useLocation();

  const reloadBalance = useCallback(async () => {
    const { data } = await getBalance(format(period, 'yyyy-MM'));
    setBalance(data);
  }, [period]);

  const isTableViewActive = () => {
    return view === 'table';
  };

  const isGraphViewActive = () => {
    return view === 'graph';
  };

  const handleCloseModal = useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const handleTransactionAddedOrEdited = useCallback(() => {
    reloadBalance();
    resetDashboardTableView();
    handleCloseModal();
  }, [handleCloseModal, reloadBalance]);

  const resetDashboardTableView = (): void => {
    setSeed(Math.random());
  };

  useEffect(() => {
    if (location.pathname.includes('home')) {
      setView('table')
    } else {
      setView('graph');
    }
    setOpen(false);
    reloadBalance();
  }, [location.pathname, reloadBalance]);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <Header open={open} size='small' />
      <Container>
        {isTableViewActive() && (
          <CardContainer>
            <Card>
              <div>
                <img src={income} alt="Income" />
                <p>Entradas</p>
              </div>
              <BalanceValue data-testid="balance-income">
                {formatValue(balance?.income)}
              </BalanceValue>
            </Card>
            <Card>
              <div>
                <img src={outcome} alt="Outcome" />
                <p>Saídas</p>
              </div>
              <BalanceValue data-testid="balance-outcome">
                {formatValue(balance?.outcome)}
              </BalanceValue>
            </Card>
            <Card>
              <div>
                <SvgTotal height={32} color={theme.colors.primary} />
                <p>Total</p>
              </div>
              <BalanceValue data-testid="balance-total" isPositive={balance?.total >= 0}>{formatValue(balance?.total)}</BalanceValue>
            </Card>
          </CardContainer>
        )}

        <TitleAndViewSelector>
          {isTableViewActive() ? <h1>Transações</h1> : <h1>Dashboard</h1>}
          <PeriodDate
            date={period}
            onChangePeriod={newDate => setPeriod(newDate)}
          />
        </TitleAndViewSelector>

        {isTableViewActive() && (
          <>
            <Button onClick={() => setIsShowingModal(true)}>
              Nova transação
            </Button>
            <DashboardTableView
              onTransactionDeleted={() => reloadBalance()}
              period={period}
              key={seed}
            />
          </>
        )}

        {isGraphViewActive() && <DashboardGraphView period={period} />}
      </Container>

      <Modal
        show={isShowingModal}
        onClose={handleCloseModal}
        title="Nova transação"
      >
        <FormTransaction
          onSubmitted={handleTransactionAddedOrEdited}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
}

export default Home;
