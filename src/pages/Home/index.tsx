import React, { useState, useEffect, useCallback } from 'react';
import { FiPieChart, FiList } from 'react-icons/fi';
import { toast } from 'react-toastify';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';
import DashboardTableView from './DashboardTableView';
import DashboardGraphView from './DashboardGraphView';

import formatValue from '../../utils/formatValue';

import { Balance, Transaction } from '../../services/interfaces';

import { Container, CardContainer, Card, TitleAndViewSelector } from './styles';
import PeriodDate from '../../components/PeriodDate';
import { format } from 'date-fns';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import FormTransaction from '../FormTransaction';
import { useLocation } from 'react-router-dom';
import Burger from '../../components/Burger';

function Home(): React.JSX.Element {
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [view, setView] = useState<'table' | 'graph'>('table');
  const [period, setPeriod] = React.useState<Date>(new Date());
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);

  const [seed, setSeed] = React.useState<number>(1);

  const location = useLocation();

  const reloadBalance = useCallback(async () => {
    console.log(`Carregando período de: ${format(period, "MMMM 'de' yyyy")}`);

    const { data } = await api.get(`/transactions/balance`, {
      params: {
        period: format(period, 'yyyy-MM'),
      },
    });
    setBalance(data);
  }, [period]);

  const handleCloseModal = useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const handleTransactionAddedOrEdited = useCallback(() => {
    console.log('Home');
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

  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <Header open={open} size={view === 'graph' ? 'small' : 'small'} />
      <Container>
        {view === 'table' && (
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
                <img src={total} alt="Total" />
                <p>Total</p>
              </header>
              <h1 data-testid="balance-total">{formatValue(balance?.total)}</h1>
            </Card>
          </CardContainer>
        )}

        <TitleAndViewSelector>
          {view === 'table' ? <h1>Transações</h1> : <h1>Dashboard</h1>}

          <PeriodDate
            date={period}
            onChangePeriod={newDate => setPeriod(newDate)}
          />
        </TitleAndViewSelector>

        {view === 'table' && (
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

        {view === 'graph' && <DashboardGraphView period={period} />}
      </Container>

      <Modal show={isShowingModal} onClose={handleCloseModal} height={50}>
        <FormTransaction
          onSubmitted={handleTransactionAddedOrEdited}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
}

export default Home;
