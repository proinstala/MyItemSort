
package io.proinstala.myitemsort.shared.dtos;


import io.proinstala.myitemsort.shared.consts.Disponibilidad;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExistenciaDTO {
    
    private int id;
    private ArticuloDTO articulo;
    private ProveedorDTO proveedor;
    private String sku;
    private EmplazamientoDTO emplazamiento;
    private double precio;
    private LocalDate fechaCompra;
    private String comprador;
    private Disponibilidad disponible;
    private LocalDate fechaNoDisponible;
    private String anotacion;
}
