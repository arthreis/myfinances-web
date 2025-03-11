import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import * as Icons from 'react-icons/fi';

import ReactPaginate from 'react-paginate';
import formatValue from '@/utils/formatValue';
import { useTheme } from '@/hooks/theme';

import api from '@/services/api';

import type {
  Pagination,
  PaginationChange,
  Sort,
  Transaction,
  RowsByPageOption,
} from '@/schemas';

import {
  TableContainer,
  TableBodyColumn,
  PaginationContainer,
  RowsByPageContainer,
} from './styles';
import { Actions } from '@/pages/Config/styles';
import Modal from '@/components/Modal';
import FormTransaction from '../FormTransaction';
import SelectSimple from '@/components/SelectSimple';
import { Typography } from '@/components/Typograph';
import { Tooltip } from '@/components';

interface DashboardTableViewProps {
  onTransactionDeleted(): void;
  period: Date;
}

function DashboardTableView({
  onTransactionDeleted,
  period,
}: DashboardTableViewProps): React.JSX.Element {
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);

  const [rowsByPage] = useState<RowsByPageOption[]>([
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 20, label: 20 },
  ]);

  const [sortData, setSortData] = useState<Sort>(() => {
    return {
      sort: 'created_at',
      direction: 'DESC',
    };
  });

  const [pagination, setPagination] = useState<Pagination>(() => {
    return {
      page: 1,
      pageSize: rowsByPage[0].value,
      total: 0,
    };
  });
  const [transactionEdit, setTransactionEdit] = useState<Transaction>();

  const reloadTransactions = useCallback(() => {
    console.log('Carregando transações');
    async function loadTransactions(
      { sort, direction }: Sort,
      { page, pageSize }: Omit<Pagination, 'total'>,
    ): Promise<void> {
      const { data } = await api.get('/transactions', {
        params: {
          sort,
          direction,
          page,
          pageSize,
          period: format(period, 'yyyy-MM'),
        },
      });

      setTransactions(data.transactions);

      setPagination(oldPagination => ({
        ...oldPagination,
        total: data.pageCount,
      }));
    }

    loadTransactions(sortData, {
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
  }, [sortData, pagination.page, pagination.pageSize, period]);

  const handlePaginate = useCallback((selectedItem: PaginationChange) => {
    setPagination(oldPagination => ({
      ...oldPagination,
      page: selectedItem.selected + 1,
    }));
  }, []);

  const handleSort = useCallback((sort: string, direction: string) => {
    setSortData({ sort, direction });
    setPagination(oldPagination => ({ ...oldPagination, page: 1 }));
  }, []);

  const handleDelete = useCallback(
    async (transactionToDelete: Transaction): Promise<void> => {
      await api.delete(`/transactions/${transactionToDelete.id}`);

      toast.success('Transação apagada com sucesso!');
      reloadTransactions();
      onTransactionDeleted();
    },
    [reloadTransactions, onTransactionDeleted],
  );

  const handleCloseModal = useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const handleTransactionAddedOrEdited = useCallback(() => {
    console.log('DashboardTableView');
    reloadTransactions();
    handleCloseModal();
  }, [handleCloseModal, reloadTransactions]);

  const handleOpenModalEdit = useCallback((transaction?: Transaction) => {
    setTransactionEdit(transaction);
    setIsShowingModal(true);
  }, []);

  const sortIcon =
    sortData.direction === 'DESC' ? (
      <Icons.FiChevronDown
        size={20}
        onClick={() => handleSort('created_at', 'ASC')}
      />
    ) : (
      <Icons.FiChevronUp
        size={20}
        onClick={() => handleSort('created_at', 'DESC')}
      />
    );

  const onChangePageSize = (e: any): void => {
    // setPageSize(Number(e.value));
    // setPageSize(Number(e.value));
    setPagination(oldPagination => ({
      ...oldPagination,
      pageSize: Number(e.value),
    }));
    // reloadTransactions();
  };

  useEffect(() => {
    reloadTransactions();
  }, [reloadTransactions]);

  return (
    <>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Data {sortIcon}</th>
              <th>&nbsp;Ações</th>
            </tr>
          </thead>

          <tbody>
            {transactions?.map(transaction => {
              const CategoryIcon = (Icons as any)[transaction.category.icon];
              const categoryBackgroundKey = `background_color_${theme.title}`;
              const categoryBackground =
                transaction.category[
                  categoryBackgroundKey as
                    | 'background_color_light'
                    | 'background_color_dark'
                ];
              return (
                <tr key={transaction.id}>
                  <TableBodyColumn
                    categoryBackground={categoryBackground}
                    className="title"
                  >
                    {transaction.title}
                  </TableBodyColumn>
                  <TableBodyColumn className={transaction.type}>
                    {formatValue(transaction.value)}
                  </TableBodyColumn>
                  <TableBodyColumn className="category">
                    <CategoryIcon size={20} color={categoryBackground} />
                    {transaction.category.title}
                  </TableBodyColumn>
                  <TableBodyColumn>
                    {format(
                      new Date(transaction.transaction_date),
                      'dd/MM/yyyy',
                    )}
                  </TableBodyColumn>
                  <TableBodyColumn>
                    <Actions>
                      <Tooltip variant="secondary" title="Editar transação">
                        <Icons.FiEdit
                          size={20}
                          onClick={() => handleOpenModalEdit(transaction)}
                        />
                      </Tooltip>
                      <Tooltip variant="danger" title="Apagar transação">
                        <Icons.FiTrash
                          size={20}
                          onClick={() => handleDelete(transaction)}
                        />
                      </Tooltip>
                    </Actions>
                  </TableBodyColumn>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>

      <PaginationContainer className="pagination">
        <RowsByPageContainer className="rowsByPage">
          <Typography>Linhas por página:</Typography>
          <SelectSimple
            options={rowsByPage}
            onChange={onChangePageSize}
            defaultValue={rowsByPage[0]}
          />
        </RowsByPageContainer>
        <ReactPaginate
          previousLabel={<Icons.FiChevronLeft />}
          nextLabel={<Icons.FiChevronRight />}
          pageCount={pagination.total}
          onPageChange={handlePaginate}
          forcePage={pagination.page - 1}
          disableInitialCallback
          marginPagesDisplayed={0}
          pageRangeDisplayed={3}
          containerClassName="pagination"
          activeClassName="active_page"
          nextClassName="next_page"
          previousClassName="previous_page"
        />
      </PaginationContainer>

      <Modal
        show={isShowingModal}
        onClose={handleCloseModal}
        title="Editar transação"
      >
        <FormTransaction
          onSubmitted={handleTransactionAddedOrEdited}
          onCancel={handleCloseModal}
          transactionEdit={transactionEdit}
        />
      </Modal>
    </>
  );
}

export default DashboardTableView;
