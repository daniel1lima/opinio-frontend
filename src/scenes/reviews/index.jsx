import React, { useState, useCallback, useMemo } from "react";
import { Box, useTheme, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Tooltip, // Add this import
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ChevronDownIcon } from "./ChevronDownIcon"; // Assume this is provided
import { VerticalDotsIcon } from "./VerticalDotsIcon"; // Add this import
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import TimerIcon from "@mui/icons-material/Timer";
import { useGetReviewDataByCompanyQuery } from "state/api";
// import Header from "components/Header";
// import FlexBetween from "components/FlexBetween";
import YelpLogo from "../../assets/yelp-svgrepo-com.svg";
import GoogleLogo from "../../assets/google-icon.svg";
import TripLogo from "../../assets/tripadvisor.svg";
// import { GridCheckCircleIcon, GridCloseIcon } from "@mui/x-data-grid";

const getLogoByPlatform = (platform) => {
  switch (platform.toLowerCase()) {
    case "yelp":
      return YelpLogo;
    case "google":
      return GoogleLogo;
    case "tripadvisor":
      return TripLogo;
    default:
      return null;
  }
};

const TruncatedText = styled("span")({
  maxWidth: "150px", // Reduced from 200px
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "inline-block",
});

const Reviews = () => {
  const theme = useTheme();

  const columns = [
    // { key: "review_id", label: "ID" },
    { key: "review_date", label: "DATE" },
    { key: "review_text", label: "TEXT" },
    { key: "rating", label: "RATING" },
    { key: "platform_id", label: "PLATFORM" },
    { key: "named_labels", label: "LABEL" },
    { key: "sentiment", label: "SENTIMENT" },
    { key: "polarity", label: "POLARITY" },
    { key: "review_url", label: "URL" },
    { key: "actions", label: "ACTIONS" }, // Add this new column
  ];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Reduced from 15 to fit better

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "review_date",
    direction: "descending",
  });
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(columns.map((col) => col.key)),
  );

  const {
    data: reviewData,
    isLoading,
    error,
  } = useGetReviewDataByCompanyQuery(
    {
      company_id: localStorage.getItem("company_id"),
      page: page,
      page_size: rowsPerPage,
    },
    { skip: !localStorage.getItem("company_id") },
  );

  const review_data_array = reviewData ? reviewData.reviews : [];

  const headerColumns = useMemo(() => {
    return columns.filter((column) => visibleColumns.has(column.key));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredReviews = [...review_data_array];

    if (filterValue) {
      filteredReviews = filteredReviews.filter((review) =>
        review.review_text.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredReviews;
  }, [review_data_array, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((review, columnKey) => {
    const cellValue = review[columnKey];

    switch (columnKey) {
      case "review_text":
        return (
          <Tooltip content={cellValue}>
            <TruncatedText>{cellValue}</TruncatedText>
          </Tooltip>
        );
      case "review_url":
        return (
          <Link
            color="blue"
            href={cellValue}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            <TruncatedText>{cellValue}</TruncatedText>
          </Link>
        );
      case "platform_id":
        const logo = getLogoByPlatform(cellValue);
        return logo ? (
          <img
            src={logo}
            alt={`${cellValue} Logo`}
            style={{ width: "24px", height: "24px" }}
          />
        ) : (
          cellValue
        );
      case "sentiment":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={
              cellValue === "Positive"
                ? "success"
                : cellValue === "Negative"
                  ? "danger"
                  : "warning"
            }
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );

      case "review_date":
        const formatDate = (dateString) => {
          const options = { year: "numeric", month: "long", day: "numeric" };
          const date = new Date(dateString);
          return date.toLocaleDateString(undefined, options);
        };
        return <Typography variant="body2">{formatDate(cellValue)}</Typography>;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-1">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon size={12} className="" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      // setPage(1); // Removed pagination state
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search reviews..."
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className=" sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {column.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} reviews
          </span>
          <span className="text-default-400 text-small">
            Showing {rowsPerPage} rows per page
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    columns,
    filteredItems.length,
    rowsPerPage,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(filteredItems.length / rowsPerPage)}
          onChange={(newPage) => setPage(newPage)}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, filteredItems.length, rowsPerPage]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
      mb="1rem"
      p=".5rem"
    >
      {/* <FlexBetween>
        <Box m="1rem 1rem 0rem">
          <Box ml="0.8rem" mt="1rem">
            <Header title="Reviews" />
          </Box>
        </Box>
      </FlexBetween> */}

      {/* Wrap the table in a container with a specific width */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          height: "750px", // Set a fixed height
          margin: "1rem auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Table
          aria-label="Reviews Table"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "flex-grow overflow-auto h-full", // Make the table wrapper scrollable and full height
            table: "min-w-full max-w-[80%]",
            thead: "bg-gray-200", // Optional: Add background color for the header
            tbody: "bg-white", // Optional: Add background color for the body
            tr: "border-b", // Optional: Add border for table rows
            th: "p-2 text-left", // Optional: Add padding and text alignment for header cells
            td: "p-2", // Optional: Add padding for data cells
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.key}
                allowsSorting={column.key !== "actions"} // Disable sorting for actions column
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedItems}>
            {(item) => (
              <TableRow key={item.review_id}>
                {(columnKey) =>
                  visibleColumns.has(columnKey) && (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Reviews;
