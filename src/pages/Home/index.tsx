import React, { useState, useEffect, useCallback } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import { ReactComponent as IconTotal } from '../../assets/total.svg';

import Header from '../../components/Header';
import DashboardTableView from './DashboardTableView';
import DashboardGraphView from './DashboardGraphView';

import formatValue from '../../utils/formatValue';

import { Balance } from '../../services/interfaces';

import { Container, CardContainer, Card, TitleAndViewSelector } from './styles';
import PeriodDate from '../../components/PeriodDate';
import { format } from 'date-fns';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import FormTransaction from './FormTransaction';
import { useLocation } from 'react-router-dom';
import Burger from '../../components/Burger';
import { getBalance } from '../../services/transaction/get-balance';
import { useTheme } from '../../hooks/theme';

function Home(): React.JSX.Element {
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [view, setView] = useState<'table' | 'graph'>('table');
  const [period, setPeriod] = React.useState<Date>(new Date());
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);
  const [seed, setSeed] = React.useState<number>(1);
  const [open, setOpen] = React.useState(true);

  const { theme } = useTheme();
  const location = useLocation();

  const reloadBalance = useCallback(async () => {
    console.log(`Carregando período de: ${format(period, "MMMM 'de' yyyy")}`);
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
    location.pathname.includes('home') ? setView('table') : setView('graph');
    setOpen(false);
    reloadBalance();
  }, [location.pathname, reloadBalance]);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <Header open={open} size={isGraphViewActive() ? 'small' : 'small'} />
      <Container>
        {isTableViewActive() && (
          <CardContainer>
            <Card>
              <header>
                <img src={income} alt="Income" />
                <p>Entradas</p>
              </header>
              <h1 data-testid="balance-income">
                {formatValue(balance?.income)}
              </h1>
            </Card>
            <Card>
              <header>
                <img src={outcome} alt="Outcome" />
                <p>Saídas</p>
              </header>
              <h1 data-testid="balance-outcome">
                {formatValue(balance?.outcome)}
              </h1>
            </Card>
            <Card total>
              <header>
                <IconTotal color={theme.colors.primary} />
                <p>Total</p>
              </header>
              <h1 data-testid="balance-total">{formatValue(balance?.total)}</h1>
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
            <Button
              style={{ width: 200 }}
              onClick={() => setIsShowingModal(true)}
            >
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
