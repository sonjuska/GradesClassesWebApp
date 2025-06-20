USE [master]
GO
/****** Object:  Database [GradesClassesApp]    Script Date: 29.5.2025. 13:21:50 ******/
CREATE DATABASE [GradesClassesApp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GradesClassesApp', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\GradesClassesApp.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GradesClassesApp_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\GradesClassesApp_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [GradesClassesApp] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GradesClassesApp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GradesClassesApp] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GradesClassesApp] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GradesClassesApp] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GradesClassesApp] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GradesClassesApp] SET ARITHABORT OFF 
GO
ALTER DATABASE [GradesClassesApp] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GradesClassesApp] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GradesClassesApp] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GradesClassesApp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GradesClassesApp] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GradesClassesApp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GradesClassesApp] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GradesClassesApp] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GradesClassesApp] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GradesClassesApp] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GradesClassesApp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GradesClassesApp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GradesClassesApp] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GradesClassesApp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GradesClassesApp] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GradesClassesApp] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GradesClassesApp] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GradesClassesApp] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GradesClassesApp] SET  MULTI_USER 
GO
ALTER DATABASE [GradesClassesApp] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GradesClassesApp] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GradesClassesApp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GradesClassesApp] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GradesClassesApp] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GradesClassesApp] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [GradesClassesApp] SET QUERY_STORE = ON
GO
ALTER DATABASE [GradesClassesApp] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [GradesClassesApp]
GO
/****** Object:  Table [dbo].[Odeljenja]    Script Date: 29.5.2025. 13:21:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Odeljenja](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RazredId] [int] NOT NULL,
	[Naziv] [nvarchar](50) NOT NULL,
	[VrstaOdeljenjaId] [int] NOT NULL,
	[Kombinovano] [bit] NOT NULL,
	[CelodnevnaNastava] [bit] NOT NULL,
	[IzdvojenoOdeljenje] [bit] NOT NULL,
	[NazivIzdvojeneSkole] [nvarchar](50) NULL,
	[OdeljenjskiStaresina] [nvarchar](50) NULL,
	[Smena] [nvarchar](50) NULL,
	[JezikNastaveId] [int] NOT NULL,
	[Dvojezicno] [bit] NOT NULL,
	[PrviStraniJezikId] [int] NULL,
	[BrojUcenika] [int] NOT NULL,
	[BrojDecaka] [int] NOT NULL,
	[BrojDevojcica] [int] NOT NULL,
	[DatumUnosa] [datetime] NOT NULL,
	[DatumIzmene] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Razredi]    Script Date: 29.5.2025. 13:21:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Razredi](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SkolskaGodinaId] [int] NOT NULL,
	[RazredId] [int] NOT NULL,
	[ProgramId] [int] NOT NULL,
	[UkupanBrojUcenika] [int] NOT NULL,
	[UkupanBrojOdeljenja] [int] NOT NULL,
	[DatumUnosa] [datetime] NOT NULL,
	[DatumIzmene] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sifrarnici]    Script Date: 29.5.2025. 13:21:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sifrarnici](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Kategorija] [nvarchar](50) NOT NULL,
	[DatumUnosa] [datetime] NOT NULL,
	[DatumIzmene] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StavkeSifrarnika]    Script Date: 29.5.2025. 13:21:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StavkeSifrarnika](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SifrarnikId] [int] NOT NULL,
	[Vrednost] [nvarchar](50) NOT NULL,
	[DatumUnosa] [datetime] NOT NULL,
	[DatumIzmene] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Odeljenja] ADD  DEFAULT ((0)) FOR [Kombinovano]
GO
ALTER TABLE [dbo].[Odeljenja] ADD  DEFAULT ((0)) FOR [CelodnevnaNastava]
GO
ALTER TABLE [dbo].[Odeljenja] ADD  DEFAULT ((0)) FOR [IzdvojenoOdeljenje]
GO
ALTER TABLE [dbo].[Odeljenja] ADD  DEFAULT ('') FOR [NazivIzdvojeneSkole]
GO
ALTER TABLE [dbo].[Odeljenja] ADD  DEFAULT ((0)) FOR [Dvojezicno]
GO
ALTER TABLE [dbo].[Odeljenja]  WITH CHECK ADD FOREIGN KEY([JezikNastaveId])
REFERENCES [dbo].[StavkeSifrarnika] ([Id])
GO
ALTER TABLE [dbo].[Odeljenja]  WITH CHECK ADD FOREIGN KEY([PrviStraniJezikId])
REFERENCES [dbo].[StavkeSifrarnika] ([Id])
GO
ALTER TABLE [dbo].[Odeljenja]  WITH CHECK ADD FOREIGN KEY([RazredId])
REFERENCES [dbo].[Razredi] ([Id])
GO
ALTER TABLE [dbo].[Odeljenja]  WITH CHECK ADD FOREIGN KEY([VrstaOdeljenjaId])
REFERENCES [dbo].[StavkeSifrarnika] ([Id])
GO
ALTER TABLE [dbo].[Odeljenja]  WITH CHECK ADD  CONSTRAINT [FK_Odeljenja_Razredi] FOREIGN KEY([RazredId])
REFERENCES [dbo].[Razredi] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Odeljenja] CHECK CONSTRAINT [FK_Odeljenja_Razredi]
GO
ALTER TABLE [dbo].[Razredi]  WITH CHECK ADD FOREIGN KEY([ProgramId])
REFERENCES [dbo].[StavkeSifrarnika] ([Id])
GO
ALTER TABLE [dbo].[Razredi]  WITH CHECK ADD FOREIGN KEY([RazredId])
REFERENCES [dbo].[StavkeSifrarnika] ([Id])
GO
ALTER TABLE [dbo].[Razredi]  WITH CHECK ADD FOREIGN KEY([SkolskaGodinaId])
REFERENCES [dbo].[StavkeSifrarnika] ([Id])
GO
ALTER TABLE [dbo].[StavkeSifrarnika]  WITH CHECK ADD FOREIGN KEY([SifrarnikId])
REFERENCES [dbo].[Sifrarnici] ([Id])
GO
ALTER TABLE [dbo].[Odeljenja]  WITH CHECK ADD CHECK  (([BrojUcenika]>(0)))
GO
/****** Object:  Trigger [dbo].[odeljenja_Insert_DatumUnosa]    Script Date: 29.5.2025. 13:21:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Odeljenja insert triger
CREATE TRIGGER [dbo].[odeljenja_Insert_DatumUnosa]
ON [dbo].[Odeljenja]
AFTER INSERT
AS
BEGIN
    UPDATE Odeljenja
    SET DatumUnosa = GETDATE()
    FROM Odeljenja O
    INNER JOIN inserted i ON O.Id = i.Id;
END;
GO
ALTER TABLE [dbo].[Odeljenja] ENABLE TRIGGER [odeljenja_Insert_DatumUnosa]
GO
/****** Object:  Trigger [dbo].[odeljenja_Update_DatumIzmene]    Script Date: 29.5.2025. 13:21:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Odeljenja update triger
CREATE TRIGGER [dbo].[odeljenja_Update_DatumIzmene]
ON [dbo].[Odeljenja]
AFTER UPDATE
AS
BEGIN
    UPDATE Odeljenja
    SET DatumIzmene = GETDATE()
    FROM Odeljenja O
    INNER JOIN inserted i ON O.Id = i.Id;
END;
GO
ALTER TABLE [dbo].[Odeljenja] ENABLE TRIGGER [odeljenja_Update_DatumIzmene]
GO
/****** Object:  Trigger [dbo].[update_BrojUcenika]    Script Date: 29.5.2025. 13:21:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[update_BrojUcenika]
ON [dbo].[Odeljenja]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(BrojDecaka) OR UPDATE(BrojDevojcica)
    BEGIN
        UPDATE O
        SET BrojUcenika = i.BrojDecaka + i.BrojDevojcica
        FROM Odeljenja O
        INNER JOIN inserted i ON O.Id = i.Id;
    END
END;
GO
ALTER TABLE [dbo].[Odeljenja] ENABLE TRIGGER [update_BrojUcenika]
GO
/****** Object:  Trigger [dbo].[update_UkupanBrojOdeljenja_Razredi]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[update_UkupanBrojOdeljenja_Razredi]
ON [dbo].[Odeljenja]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE R
    SET UkupanBrojOdeljenja = (
        SELECT COUNT(*)
        FROM Odeljenja O
        WHERE O.RazredId = R.Id
    )
    FROM Razredi R
    WHERE R.Id IN (
        SELECT DISTINCT RazredId FROM inserted
    );
END;
GO
ALTER TABLE [dbo].[Odeljenja] ENABLE TRIGGER [update_UkupanBrojOdeljenja_Razredi]
GO
/****** Object:  Trigger [dbo].[update_UkupanBrojUcenika_Razredi]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[update_UkupanBrojUcenika_Razredi]
ON [dbo].[Odeljenja]
AFTER UPDATE
AS
BEGIN
    UPDATE R
    SET UkupanBrojUcenika = (
        SELECT SUM(BrojUcenika)
        FROM Odeljenja
        WHERE RazredId = R.Id
    )
    FROM Razredi R
    WHERE R.Id IN (
        SELECT DISTINCT RazredId FROM inserted
    );
END;


GO
ALTER TABLE [dbo].[Odeljenja] ENABLE TRIGGER [update_UkupanBrojUcenika_Razredi]
GO
/****** Object:  Trigger [dbo].[updateRazrediUkupanBrojUcenikaIOdeljenjaOnOdeljenjeDelete]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[updateRazrediUkupanBrojUcenikaIOdeljenjaOnOdeljenjeDelete]
ON [dbo].[Odeljenja]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update Razredi table for each affected RazredId
    UPDATE r
    SET 
        r.UkupanBrojOdeljenja = (
            SELECT COUNT(*) 
            FROM dbo.Odeljenja o 
            WHERE o.RazredId = d.RazredId
        ),
        r.UkupanBrojUcenika = (
            SELECT ISNULL(SUM(o.BrojUcenika), 0)
            FROM dbo.Odeljenja o 
            WHERE o.RazredId = d.RazredId
        )
    FROM dbo.Razredi r
    INNER JOIN (
        SELECT DISTINCT RazredId 
        FROM deleted
    ) d ON r.Id = d.RazredId;
END;
GO
ALTER TABLE [dbo].[Odeljenja] ENABLE TRIGGER [updateRazrediUkupanBrojUcenikaIOdeljenjaOnOdeljenjeDelete]
GO
/****** Object:  Trigger [dbo].[razredi_Insert_DatumUnosa]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- TRIGERI ZA INSERT I UPDATE (DatumUnosa i DatumIzmene)

--razredi insert triger
CREATE TRIGGER [dbo].[razredi_Insert_DatumUnosa]
ON [dbo].[Razredi]
AFTER INSERT
AS
BEGIN
    UPDATE Razredi
    SET DatumUnosa = GETDATE()
    FROM Razredi R
    INNER JOIN inserted i ON R.Id = i.Id;
END;
GO
ALTER TABLE [dbo].[Razredi] ENABLE TRIGGER [razredi_Insert_DatumUnosa]
GO
/****** Object:  Trigger [dbo].[razredi_Update_DatumIzmene]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--razredi update triger
CREATE TRIGGER [dbo].[razredi_Update_DatumIzmene]
ON [dbo].[Razredi]
AFTER UPDATE
AS
BEGIN
    UPDATE Razredi
    SET DatumIzmene = GETDATE()
    FROM Razredi R
    INNER JOIN inserted i ON R.Id = i.Id;
END;
GO
ALTER TABLE [dbo].[Razredi] ENABLE TRIGGER [razredi_Update_DatumIzmene]
GO
/****** Object:  Trigger [dbo].[trg_Sifrarnici_Insert_DatumUnosa]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Trigger za INSERT na tabelu Sifrarnici
CREATE TRIGGER [dbo].[trg_Sifrarnici_Insert_DatumUnosa]
ON [dbo].[Sifrarnici]
AFTER INSERT
AS
BEGIN
    UPDATE Sifrarnici
    SET DatumUnosa = GETDATE()
    FROM Sifrarnici S
    INNER JOIN inserted i ON S.Id = i.Id;
END;

GO
ALTER TABLE [dbo].[Sifrarnici] ENABLE TRIGGER [trg_Sifrarnici_Insert_DatumUnosa]
GO
/****** Object:  Trigger [dbo].[trg_Sifrarnici_Update_DatumIzmene]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Trigger za UPDATE na tabelu Sifrarnici
CREATE TRIGGER [dbo].[trg_Sifrarnici_Update_DatumIzmene]
ON [dbo].[Sifrarnici]
AFTER UPDATE
AS
BEGIN
    UPDATE Sifrarnici
    SET DatumIzmene = GETDATE()
    FROM Sifrarnici S
    INNER JOIN inserted i ON S.Id = i.Id;
END;



GO
ALTER TABLE [dbo].[Sifrarnici] ENABLE TRIGGER [trg_Sifrarnici_Update_DatumIzmene]
GO
/****** Object:  Trigger [dbo].[trg_StavkeSifrarnika_Insert_DatumUnosa]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- StavkeSifrarnika insert triger
CREATE TRIGGER [dbo].[trg_StavkeSifrarnika_Insert_DatumUnosa]
ON [dbo].[StavkeSifrarnika]
AFTER INSERT
AS
BEGIN
    UPDATE StavkeSifrarnika
    SET DatumUnosa = GETDATE()
    FROM StavkeSifrarnika S
    INNER JOIN inserted i ON S.Id = i.Id;
END;

GO
ALTER TABLE [dbo].[StavkeSifrarnika] ENABLE TRIGGER [trg_StavkeSifrarnika_Insert_DatumUnosa]
GO
/****** Object:  Trigger [dbo].[trg_StavkeSifrarnika_Update_DatumIzmene]    Script Date: 29.5.2025. 13:21:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- StavkeSifrarnika update triger
CREATE TRIGGER [dbo].[trg_StavkeSifrarnika_Update_DatumIzmene]
ON [dbo].[StavkeSifrarnika]
AFTER UPDATE
AS
BEGIN
    UPDATE StavkeSifrarnika
    SET DatumIzmene = GETDATE()
    FROM StavkeSifrarnika S
    INNER JOIN inserted i ON S.Id = i.Id;
END;

GO
ALTER TABLE [dbo].[StavkeSifrarnika] ENABLE TRIGGER [trg_StavkeSifrarnika_Update_DatumIzmene]
GO
USE [master]
GO
ALTER DATABASE [GradesClassesApp] SET  READ_WRITE 
GO
